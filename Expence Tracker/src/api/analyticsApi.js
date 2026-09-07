import API from './axios';

export const getMonthlyAnalytics = () => API.get('/expenses/analytics/monthly');
export const getCategoryAnalytics = (month, year) =>
  API.get('/expenses/analytics/category', { params: { month, year } });