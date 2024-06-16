import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PersonCircle } from 'react-bootstrap-icons';

    const UserLoginIcon = ({ loggedInUser }) => {
        // Check if loggedInUser exists and has username property
        if (!loggedInUser || !loggedInUser.username) {
          return null; // or handle the case where loggedInUser is not available
        }
    return (
        <div className="d-flex align-items-center">
            <PersonCircle size={20} color="white" />
            <span className="ml-2 text-white">{loggedInUser.username}</span>
        </div>
    );
};

export default UserLoginIcon;
