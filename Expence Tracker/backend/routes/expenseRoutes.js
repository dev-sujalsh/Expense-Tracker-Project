const express = require('express');
const router = express.Router();
const {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getMonthlyAnalytics,
  getCategoryAnalytics,
} = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

// Analytics routes (must come BEFORE /:id routes)
router.get('/analytics/monthly', protect, getMonthlyAnalytics);
router.get('/analytics/category', protect, getCategoryAnalytics);

router.route('/')
  .get(protect, getExpenses)
  .post(protect, createExpense);

router.route('/:id')
  .put(protect, updateExpense)
  .delete(protect, deleteExpense);

module.exports = router;