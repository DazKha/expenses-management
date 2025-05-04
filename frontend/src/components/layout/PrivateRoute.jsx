import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Placeholder auth check; replace with real logic
const isAuthenticated = () => Boolean(localStorage.getItem('userToken'));

const PrivateRoute = () => (
  isAuthenticated() ? <Outlet /> : <Navigate to="/login" />
);

export default PrivateRoute;
