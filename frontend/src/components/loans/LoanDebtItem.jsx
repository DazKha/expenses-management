import React from 'react';
import './LoanDebtItem.css';

const LoanDebtItem = ({ item, formatCurrency }) => {
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Check if due date is passed
  const isDueDatePassed = () => {
    const today = new Date();
    const dueDate = new Date(item.due_date);
    return today > dueDate;
  };
  
  return (
    <div className={`loan-debt-item ${item.type}`}>
      <div className="loan-debt-info">
        <div className="loan-debt-person">{item.person}</div>
        <div className="loan-debt-amount">{formatCurrency(item.amount)}</div>
      </div>
      
      <div className="loan-debt-details">
        <div className={`loan-debt-due-date ${isDueDatePassed() ? 'overdue' : ''}`}>
          Due: {formatDate(item.due_date)}
          {isDueDatePassed() && <span className="overdue-tag">Overdue</span>}
        </div>
        
        <div className="loan-debt-type">
          <span className={`type-tag ${item.type}`}>
            {item.type === 'loan' ? 'They owe you' : 'You owe them'}
          </span>
        </div>
      </div>
      
      <div className="loan-debt-actions">
        <button className="action-btn mark-paid">
          <span className="action-text">Mark as Paid</span>
        </button>
        <button className="action-btn edit">
          <span className="action-icon">✎</span>
        </button>
        <button className="action-btn delete">
          <span className="action-icon">✕</span>
        </button>
      </div>
    </div>
  );
};

export default LoanDebtItem;
