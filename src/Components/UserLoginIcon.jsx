import React from 'react';
import { PersonCircle } from 'react-bootstrap-icons';

const UserLoginIcon = () => {
    const loggedInEmail = localStorage.getItem('loggedInEmail');

    if (!loggedInEmail) {
        return null; // or handle the case where loggedInEmail is not available
    }

    return (
        <div className="d-flex align-items-center">
            <PersonCircle size={20} color="white" />
            <span className="ml-2 text-center text-white">You have successfully logged in as {loggedInEmail}</span>
        </div>
    );
};

export default UserLoginIcon;
