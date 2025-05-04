import React from 'react';
import './ExpenseItem.css';

const ExpenseItem = ({ transaction, formatCurrency }) => {
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className={`expense-item ${transaction.type}`}>
      <div className="expense-icon">
        {transaction.type === 'expense' ? '↘' : '↗'}
      </div>
      <div className="expense-details">
        <div className="expense-date">{formatDate(transaction.date)}</div>
        <div className="expense-description">{transaction.description}</div>
      </div>
      <div className="expense-category">
        <span className="category-tag">{transaction.category}</span>
      </div>
      <div className="expense-actions">
        <button className="action-btn edit">
          <span className="action-icon">✎</span>
        </button>
        <button className="action-btn delete">
          <span className="action-icon">✕</span>
        </button>
      </div>
      <div className={`expense-amount ${transaction.type}`}>
        {transaction.type === 'expense' ? '-' : '+'}{formatCurrency(transaction.amount)}
      </div>
    </div>
  );
};

export default ExpenseItem;
