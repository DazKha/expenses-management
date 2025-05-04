import React from 'react';
import '../assets/css/savingsPage.css';
import SavingItem from '../components/savings/SavingItem';

const SavingsPage = () => {
  // Mock data for savings
  const savings = [
    {
      id: 1,
      goal_name: 'New Laptop',
      target_amount: 2000,
      current_amount: 1200,
      percentage: 60
    },
    {
      id: 2,
      goal_name: 'Vacation',
      target_amount: 5000,
      current_amount: 3500,
      percentage: 70
    },
    {
      id: 3,
      goal_name: 'Emergency Fund',
      target_amount: 10000,
      current_amount: 4500,
      percentage: 45
    }
  ];
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  return (
    <div className="savings-page">
      <div className="savings-header">
        <h1>Saving Wallet</h1>
        <button className="add-saving-btn">
          <span className="add-icon">+</span>
          Add Saving Goal
        </button>
      </div>
      
      <div className="savings-container">
        <div className="savings-list">
          {savings.map(saving => (
            <SavingItem 
              key={saving.id} 
              saving={saving} 
              formatCurrency={formatCurrency} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavingsPage;
