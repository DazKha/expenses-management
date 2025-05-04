import React from 'react';
import '../assets/css/budgetsPage.css';
import BudgetItem from '../components/budgets/BudgetItem';

const BudgetsPage = () => {
  // Mock data for budgets
  const budgets = [
    {
      id: 1,
      month: 'July 2024',
      spent: 1850.75,
      amount: 2500.00,
      percentage: 74,
      remaining: 649.25
    },
    {
      id: 2,
      month: 'June 2024',
      spent: 2540.00,
      amount: 2500.00,
      percentage: 102,
      remaining: -40.00
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
    <div className="budgets-page">
      <div className="budgets-header">
        <h1>Budgets</h1>
        <button className="add-budget-btn">
          <span className="add-icon">+</span>
          Add Budget
        </button>
      </div>
      
      <div className="budgets-container">
        <div className="monthly-budgets">
          <h2>Monthly Budgets</h2>
          
          <div className="budgets-list">
            {budgets.map(budget => (
              <BudgetItem 
                key={budget.id} 
                budget={budget} 
                formatCurrency={formatCurrency} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetsPage;
