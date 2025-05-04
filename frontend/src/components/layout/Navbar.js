import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../assets/css/navbar.css';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };
  
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <ul className="nav-links">
          <li className={isActive('/')}>
            <Link to="/">Home page</Link>
          </li>
          <li className={isActive('/expenses')}>
            <Link to="/expenses">Expenses</Link>
          </li>
          <li className={isActive('/budgets')}>
            <Link to="/budgets">Budget</Link>
          </li>
          <li className={isActive('/savings')}>
            <Link to="/savings">Saving Wallet</Link>
          </li>
          <li className={isActive('/debt')}>
            <Link to="/debt">Your debt</Link>
          </li>
        </ul>
        <div className="user-section">
          <button className="user-btn">USER</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
