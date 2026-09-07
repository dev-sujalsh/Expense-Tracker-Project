function ExpenseList({ expenses, onEdit, onDelete }) {
  if (expenses.length === 0) {
    return <p>No expenses yet. Add your first one above!</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Date</th>
          <th>Notes</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((exp) => (
          <tr key={exp._id}>
            <td>{exp.title}</td>
            <td>₹{exp.amount.toFixed(2)}</td>
            <td>{exp.category}</td>
            <td>{new Date(exp.date).toLocaleDateString()}</td>
            <td>{exp.notes}</td>
            <td>
              <button onClick={() => onEdit(exp)}>Edit</button>
              <button onClick={() => onDelete(exp._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ExpenseList;