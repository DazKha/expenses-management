import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/homePage.css';

const HomePage = () => {
  // Mock data for the current balance
  const currentBalance = 5000.00;
  
  // Mock data for recent expenses
  const recentExpenses = [
    { id: 1, date: '2024-07-16', description: 'Coffee Shop', amount: 50.00 },
    { id: 2, date: '2024-07-14', description: 'Online Store', amount: 100.00 },
    { id: 3, date: '2024-07-13', description: 'Gas Station', amount: 75.00 }
  ];
  
  // Mock data for weekly income vs expenses
  const weeklyData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    income: [800, 1200, 1500, 2000],
    expenses: [500, 600, 700, 800]
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };
  
  return (
    <div className="home-page">
      <div className="balance-section">
        <div className="balance-card">
          <div className="balance-header">
            <h2>Current Balance</h2>
            <Link to="/add-expense"><button className="add-btn">Add</button></Link>
          </div>
          <div className="balance-amount">{formatCurrency(currentBalance)}</div>
        </div>
      </div>
      
      <div className="dashboard-grid">
        <div className="recent-expenses-card">
          <h2>Recent Expenses</h2>
          <div className="expenses-list">
            {recentExpenses.map(expense => (
              <div key={expense.id} className="expense-item">
                <div className="expense-date">{formatDate(expense.date)}</div>
                <div className="expense-description">{expense.description}</div>
                <div className="expense-amount">{formatCurrency(expense.amount)}</div>
              </div>
            ))}
          </div>
          <div className="view-all">
            <Link to="/expenses">View All</Link>
          </div>
        </div>
        
        <div className="chart-card">
          <div className="chart-header">
            <h2>Income vs Expenses (weekly)</h2>
            <button className="view-toggle">Show Monthly</button>
          </div>
          <div className="chart-container">
            {/* This would be replaced with an actual Chart.js component */}
            <div className="mock-chart">
              <div className="chart-legend">
                <div className="legend-item income">
                  <span className="legend-color"></span>
                  <span>Income</span>
                </div>
                <div className="legend-item expenses">
                  <span className="legend-color"></span>
                  <span>Expenses</span>
                </div>
              </div>
              <div className="chart-bars">
                {weeklyData.labels.map((label, index) => (
                  <div key={label} className="chart-bar-group">
                    <div className="chart-bar-container">
                      <div 
                        className="chart-bar income-bar" 
                        style={{ height: `${weeklyData.income[index] / 20}px` }}
                      ></div>
                      <div 
                        className="chart-bar expense-bar" 
                        style={{ height: `${weeklyData.expenses[index] / 20}px` }}
                      ></div>
                    </div>
                    <div className="chart-label">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
