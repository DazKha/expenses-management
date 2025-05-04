import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/expensesPage.css';
import ExpenseItem from '../components/expenses/ExpenseItem';

const ExpensesPage = () => {
  // Mock data for current balance
  const currentBalance = 19800000;
  
  // Mock data for transactions
  const transactions = [
    { 
      id: 1, 
      date: '2024-07-29', 
      description: 'Lunch with colleagues', 
      amount: 1200000, 
      type: 'expense',
      category: 'Ăn uống'
    },
    { 
      id: 2, 
      date: '2024-07-27', 
      description: 'Monthly rent', 
      amount: 5000000, 
      type: 'expense',
      category: 'Thuê nhà'
    },
    { 
      id: 3, 
      date: '2024-07-26', 
      description: 'Gas refill', 
      amount: 500000, 
      type: 'expense',
      category: 'Di chuyển'
    },
    { 
      id: 4, 
      date: '2024-07-25', 
      description: 'July Salary', 
      amount: 25000000, 
      type: 'income',
      category: 'Lương'
    },
    { 
      id: 5, 
      date: '2024-07-25', 
      description: 'New clothes', 
      amount: 1600000, 
      type: 'expense',
      category: 'Mua sắm'
    },
    { 
      id: 6, 
      date: '2024-07-24', 
      description: 'Freelance work', 
      amount: 3000000, 
      type: 'income',
      category: 'Bán tự do'
    }
  ];
  
  // Mock data for reports
  const incomeData = {
    total: 28000000,
    categories: [
      { name: 'Lương', percentage: 85 },
      { name: 'Bán tự do', percentage: 15 }
    ]
  };
  
  const expenseData = {
    total: 8300000,
    categories: [
      { name: 'Thuê nhà', percentage: 60 },
      { name: 'Mua sắm', percentage: 20 },
      { name: 'Ăn uống', percentage: 15 },
      { name: 'Di chuyển', percentage: 5 }
    ]
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(amount).replace('₫', 'đ');
  };
  
  return (
    <div className="expenses-page">
      <div className="balance-section">
        <div className="balance-card">
          <div className="balance-header">
            <h2>Current Balance</h2>
            <Link to="/add-expense">
              <button className="add-btn">Add</button>
            </Link>
          </div>
          <div className="balance-amount">{formatCurrency(currentBalance)}</div>
        </div>
      </div>
      
      <div className="transactions-report-grid">
        <div className="transactions-section">
          <h2>Transactions</h2>
          <div className="transactions-list">
            {transactions.map(transaction => (
              <ExpenseItem 
                key={transaction.id} 
                transaction={transaction} 
                formatCurrency={formatCurrency}
              />
            ))}
          </div>
        </div>
        
        <div className="report-section">
          <h2>Report</h2>
          
          <div className="report-card">
            <div className="report-header">
              <div className="report-title">
                <span className="report-icon income">↗</span>
                <h3>THU (Income)</h3>
              </div>
            </div>
            <div className="chart-container">
              <div className="donut-chart income-chart">
                {incomeData.categories.map((category, index) => (
                  <div 
                    key={category.name}
                    className="donut-segment"
                    style={{
                      '--start': index === 0 ? '0' : 
                        `${incomeData.categories.slice(0, index)
                          .reduce((sum, cat) => sum + cat.percentage, 0)}`,
                      '--end': `${incomeData.categories.slice(0, index + 1)
                        .reduce((sum, cat) => sum + cat.percentage, 0)}`,
                      '--color': index === 0 ? '#4285F4' : '#34A853'
                    }}
                  ></div>
                ))}
                <div className="donut-hole"></div>
              </div>
              <div className="chart-legend">
                {incomeData.categories.map((category, index) => (
                  <div key={category.name} className="legend-item">
                    <span 
                      className="legend-color"
                      style={{ backgroundColor: index === 0 ? '#4285F4' : '#34A853' }}
                    ></span>
                    <span className="legend-label">{category.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="report-card">
            <div className="report-header">
              <div className="report-title">
                <span className="report-icon expense">↘</span>
                <h3>CHI (Expenses)</h3>
              </div>
            </div>
            <div className="chart-container">
              <div className="donut-chart expense-chart">
                {expenseData.categories.map((category, index) => (
                  <div 
                    key={category.name}
                    className="donut-segment"
                    style={{
                      '--start': index === 0 ? '0' : 
                        `${expenseData.categories.slice(0, index)
                          .reduce((sum, cat) => sum + cat.percentage, 0)}`,
                      '--end': `${expenseData.categories.slice(0, index + 1)
                        .reduce((sum, cat) => sum + cat.percentage, 0)}`,
                      '--color': ['#34A853', '#FBBC05', '#EA4335', '#9C27B0'][index % 4]
                    }}
                  ></div>
                ))}
                <div className="donut-hole"></div>
              </div>
              <div className="chart-legend">
                {expenseData.categories.map((category, index) => (
                  <div key={category.name} className="legend-item">
                    <span 
                      className="legend-color"
                      style={{ backgroundColor: ['#34A853', '#FBBC05', '#EA4335', '#9C27B0'][index % 4] }}
                    ></span>
                    <span className="legend-label">{category.name}</span>
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

export default ExpensesPage;
