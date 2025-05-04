import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import ExpensesPage from './pages/ExpensesPage';
import BudgetsPage from './pages/BudgetsPage';
import SavingsPage from './pages/SavingsPage';
import LoanDebtPage from './pages/LoanDebtPage';
import LoginPage from './pages/LoginPage';
import AddExpensePage from './pages/AddExpensePage';
import './assets/css/index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/budgets" element={<BudgetsPage />} />
            <Route path="/savings" element={<SavingsPage />} />
            <Route path="/debt" element={<LoanDebtPage />} />
            <Route path="/add-expense" element={<AddExpensePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
