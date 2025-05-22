import React from 'react';
import Login from '../Login';
import Register from '../Register';

export const LogRegPage: React.FC = () => {
  return (
    <div className="logreg-page-container">
      <h1 className="logreg-title">Welcome Back!</h1>
      <div className="forms-wrapper"> 
        <Login />
        <Register />
      </div>
    </div>
  );
};