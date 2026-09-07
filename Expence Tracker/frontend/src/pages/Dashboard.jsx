import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import * as expenseApi from '../api/expenseApi';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import AnalyticsDashboard from '../components/AnalyticsDashboard';

function Dashboard() {
  const { user, logout } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchExpenses = async () => {
    try {
      const res = await expenseApi.getExpenses();
      setExpenses(res.data);
    } catch (err) {
      setError('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAddOrUpdate = async (formData) => {
    try {
      if (editingExpense) {
        await expenseApi.updateExpense(editingExpense._id, formData);
        setEditingExpense(null);
      } else {
        await expenseApi.createExpense(formData);
      }
      fetchExpenses();
    } catch (err) {
      setError('Failed to save expense');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this expense?')) return;
    try {
      await expenseApi.deleteExpense(id);
      fetchExpenses();
    } catch (err) {
      setError('Failed to delete expense');
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {user.name}!</h1>
        <button onClick={logout}>Logout</button>
      </header>

      <div className="card">
        <AnalyticsDashboard />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="card">
        <ExpenseForm
          onSubmit={handleAddOrUpdate}
          editingExpense={editingExpense}
          onCancelEdit={handleCancelEdit}
        />
      </div>

      {loading ? (
        <p>Loading expenses...</p>
      ) : (
        <div className="card">
          <ExpenseList
            expenses={expenses}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;