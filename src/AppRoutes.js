import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import CreateUserForm from './Components/CreateUserForm';
import LoginForm from './Components/LoginForm';
import CreateCustomerForm from './Components/CreateCustomerForm';
import SearchCustomerForm from './Components/SearchCustomerForm';
import CustomerManagementForm from './Components/CustomerManagementForm';
import PrivateRoute from './Components/PrivateRoute';
import AboutProject from './Components/AboutProject';


const AppRoutes = () => (
  <Routes>
    <Route path="/" element={
      <PrivateRoute>
        <Home/>
      </PrivateRoute>
    } />
    <Route path="/about" element={<AboutProject />} />
    <Route path="/create-user" element={<CreateUserForm />} />
    <Route path="/login" element={<LoginForm />} />
    <Route path="/createcustomer" element={
      <PrivateRoute>
        <CreateCustomerForm />
      </PrivateRoute>
    } />
    <Route path="/searchcustomer" element={
      <PrivateRoute>
        <SearchCustomerForm />
      </PrivateRoute>
    } />
    <Route path="/customermanagement" element={
      <PrivateRoute>
        <CustomerManagementForm />
      </PrivateRoute>
    } />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRoutes;
