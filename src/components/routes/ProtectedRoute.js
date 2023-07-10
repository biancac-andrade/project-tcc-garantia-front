/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          return <Navigate to="/login" />;
        }
      }}
    />
  );
};

