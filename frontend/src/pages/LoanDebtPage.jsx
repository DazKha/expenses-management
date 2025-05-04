import React from 'react';
import '../assets/css/loanDebtPage.css';
import LoanDebtItem from '../components/loans/LoanDebtItem';

const LoanDebtPage = () => {
  // Mock data for loans and debts
  const loansDebts = [
    {
      id: 1,
      person: 'John Doe',
      amount: 1000,
      due_date: '2024-08-15',
      type: 'loan', // money I lent to someone
      status: 'pending'
    },
    {
      id: 2,
      person: 'Jane Smith',
      amount: 500,
      due_date: '2024-07-30',
      type: 'debt', // money I owe to someone
      status: 'pending'
    },
    {
      id: 3,
      person: 'Mike Johnson',
      amount: 750,
      due_date: '2024-08-05',
      type: 'loan',
      status: 'pending'
    }
  ];
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  // Calculate totals
  const totalLoans = loansDebts
    .filter(item => item.type === 'loan' && item.status === 'pending')
    .reduce((sum, item) => sum + item.amount, 0);
    
  const totalDebts = loansDebts
    .filter(item => item.type === 'debt' && item.status === 'pending')
    .reduce((sum, item) => sum + item.amount, 0);
  
  return (
    <div className="loan-debt-page">
      <div className="loan-debt-header">
        <h1>Your Loans & Debts</h1>
        <button className="add-loan-debt-btn">
          <span className="add-icon">+</span>
          Add New
        </button>
      </div>
      
      <div className="summary-section">
        <div className="summary-card loan-summary">
          <h2>Total Outstanding Loans</h2>
          <div className="summary-amount">{formatCurrency(totalLoans)}</div>
          <div className="summary-description">Money others owe you</div>
        </div>
        
        <div className="summary-card debt-summary">
          <h2>Total Outstanding Debts</h2>
          <div className="summary-amount">{formatCurrency(totalDebts)}</div>
          <div className="summary-description">Money you owe others</div>
        </div>
      </div>
      
      <div className="loan-debt-container">
        <h2>All Loans & Debts</h2>
        
        <div className="loan-debt-list">
          {loansDebts.map(item => (
            <LoanDebtItem 
              key={item.id} 
              item={item} 
              formatCurrency={formatCurrency} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoanDebtPage;
