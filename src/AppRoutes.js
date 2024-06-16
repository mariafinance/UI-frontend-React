import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import CreateUserForm from './Components/CreateUserForm';
import LoginForm from './Components/LoginForm';
import CreateCustomerForm from './Components/CreateCustomerForm';
import SearchCustomerForm from './Components/SearchCustomerForm';

const AppRoutes = () => (
    <Routes>
    {/* <Route path="/" element={<Home />} /> */}
    <Route path="/" element={<Home/>} />
    {/* <Route path="/" exact component={Home} /> */}
    <Route path="/create-user" element={<CreateUserForm />} />
    <Route path="/login" element={<LoginForm />} />
    {/* In this example, if none of the defined routes match, the <Navigate> component will redirect to the home page ("/"). */}
    <Route path="*" element={<Navigate to="/" />} /> 
    <Route path="/createcustomer" element={<CreateCustomerForm />} />
    <Route path='/searchcustomer' element={<SearchCustomerForm />} />
    </Routes>
);

export default AppRoutes ;
