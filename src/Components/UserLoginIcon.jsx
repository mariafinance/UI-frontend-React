import React from 'react';
import { PersonCircle } from 'react-bootstrap-icons';

const UserLoginIcon = () => {
    const loggedInEmail = localStorage.getItem('loggedInEmail');

    if (!loggedInEmail) {
        return null; 
    }

    return (
        <div className="d-flex align-items-center">
            <PersonCircle size={20} color="white" />
            <span className="ml-2 text-center text-white">Logged in as {loggedInEmail}</span>
        </div>
    );
};

export default UserLoginIcon;
