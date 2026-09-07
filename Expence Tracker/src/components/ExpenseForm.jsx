import { useState, useEffect } from 'react';

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other'];

function ExpenseForm({ onSubmit, editingExpense, onCancelEdit }) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  // When editingExpense changes, fill the form with its data
  useEffect(() => {
    if (editingExpense) {
      setFormData({
        title: editingExpense.title,
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: new Date(editingExpense.date).toISOString().split('T')[0],
        notes: editingExpense.notes || '',
      });
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      amount: '',
      category: 'Food',
      date: new Date().toISOString().split('T')[0],
      notes: '',
    });
  };

  return (
    <div>
      <h3>{editingExpense ? 'Edit Expense' : 'Add Expense'}</h3>
      <form onSubmit={handleSubmit} className="expense-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          step="0.01"
          required
        />
        <select name="category" value={formData.category} onChange={handleChange}>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <input
          type="text"
          name="notes"
          placeholder="Notes (optional)"
          value={formData.notes}
          onChange={handleChange}
        />
        <button type="submit">{editingExpense ? 'Update' : 'Add'} Expense</button>
        {editingExpense && (
          <button type="button" onClick={onCancelEdit}>Cancel</button>
        )}
      </form>
    </div>
  );
}

export default ExpenseForm;