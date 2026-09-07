import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import * as analyticsApi from '../api/analyticsApi';

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF6699', '#82ca9d'];

function AnalyticsDashboard() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const now = new Date();
        const [monthlyRes, categoryRes] = await Promise.all([
          analyticsApi.getMonthlyAnalytics(),
          analyticsApi.getCategoryAnalytics(now.getMonth() + 1, now.getFullYear()),
        ]);

        // Format monthly data for the chart (needs a readable label)
        const formattedMonthly = monthlyRes.data.map((item) => ({
          label: `${MONTH_NAMES[item._id.month - 1]} ${item._id.year}`,
          total: item.total,
        }));

        setMonthlyData(formattedMonthly);
        setCategoryData(categoryRes.data);
      } catch (err) {
        console.error('Failed to load analytics', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading analytics...</p>;

  return (
    <div>
      <h2>Analytics Dashboard</h2>
      <div className="analytics-grid">
        <div>
          <h3>Monthly Spending</h3>
          {monthlyData.length === 0 ? (
            <p>No data yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div>
          <h3>This Month by Category</h3>
          {categoryData.length === 0 ? (
            <p>No expenses this month yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="total"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry._id}: ₹${entry.total.toFixed(2)}`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={entry._id} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;