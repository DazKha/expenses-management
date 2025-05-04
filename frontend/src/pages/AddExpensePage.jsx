import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddExpensePage = () => {
  const [form, setForm] = useState({ date: '', description: '', amount: '', category: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: integrate with backend or state management
    console.log('New expense:', form);
    navigate('/expenses');
  };

  return (
    <div className="add-expense-page">
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={form.description} onChange={handleChange} required />
        </label>
        <label>
          Amount:
          <input type="number" name="amount" value={form.amount} onChange={handleChange} required />
        </label>
        <label>
          Category:
          <input type="text" name="category" value={form.category} onChange={handleChange} required />
        </label>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpensePage;
