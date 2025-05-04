import React from 'react';
import './BudgetItem.css';

const BudgetItem = ({ budget, formatCurrency }) => {
  // Determine the progress bar color based on percentage
  const getProgressColor = (percentage) => {
    if (percentage >= 100) return 'var(--danger-color)';
    if (percentage >= 75) return 'var(--warning-color)';
    return 'var(--accent-color)';
  };
  
  return (
    <div className="budget-item">
      <div className="budget-header">
        <h3 className="budget-month">{budget.month}</h3>
        <div className="budget-actions">
          <button className="action-btn edit">
            <span className="action-icon">✎</span>
          </button>
          <button className="action-btn delete">
            <span className="action-icon">✕</span>
          </button>
        </div>
      </div>
      
      <div className="budget-info">
        <div className="budget-spent">
          Spent: <span className="amount">{formatCurrency(budget.spent)}</span> / {formatCurrency(budget.amount)}
        </div>
        
        <div className="budget-progress-container">
          <div 
            className="budget-progress-bar" 
            style={{ 
              width: `${Math.min(budget.percentage, 100)}%`,
              backgroundColor: getProgressColor(budget.percentage)
            }}
          ></div>
        </div>
        
        <div className="budget-details">
          <div className="budget-percentage">{budget.percentage}% used</div>
          <div className={`budget-remaining ${budget.remaining < 0 ? 'negative' : ''}`}>
            {budget.remaining < 0 ? formatCurrency(Math.abs(budget.remaining)) + ' over' : formatCurrency(budget.remaining) + ' left'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetItem;
