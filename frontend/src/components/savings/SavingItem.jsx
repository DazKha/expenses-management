import React from 'react';
import './SavingItem.css';

const SavingItem = ({ saving, formatCurrency }) => {
  return (
    <div className="saving-item">
      <div className="saving-header">
        <h3 className="saving-name">{saving.goal_name}</h3>
        <div className="saving-actions">
          <button className="action-btn add-funds">
            <span className="action-icon">+</span>
          </button>
          <button className="action-btn edit">
            <span className="action-icon">✎</span>
          </button>
          <button className="action-btn delete">
            <span className="action-icon">✕</span>
          </button>
        </div>
      </div>
      
      <div className="saving-info">
        <div className="saving-amounts">
          <span className="current-amount">{formatCurrency(saving.current_amount)}</span>
          <span className="amount-separator"> / </span>
          <span className="target-amount">{formatCurrency(saving.target_amount)}</span>
        </div>
        
        <div className="saving-progress-container">
          <div 
            className="saving-progress-bar" 
            style={{ width: `${saving.percentage}%` }}
          ></div>
        </div>
        
        <div className="saving-percentage">
          {saving.percentage}% complete
        </div>
      </div>
    </div>
  );
};

export default SavingItem;
