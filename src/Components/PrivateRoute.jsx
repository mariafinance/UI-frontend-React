import { Navigate } from "react-router-dom";
import React from 'react';
// A wrapper for <Route> that redirects to the login screen if you're not yet authenticated.
//PrivateRoute Component: This checks if an access_token is present in localStorage. If the token exists, it renders the protected component; otherwise, it redirects to the login page.

function PrivateRoute({ children }) {
  const token = localStorage.getItem('access_token');
  return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
