import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const useLoginForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors ] = useState({});
  const [isSubmitting] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [callback, errors, isSubmitting]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/user/login', {
            email: values.email,
            password: values.password
        });
        const { access_token, msg } = response.data;
        if (access_token) {
            // Login successful, store the JWT token in localStorage or sessionStorage
            localStorage.setItem('access_token', access_token);
            localStorage.setItem("loggedInEmail", values.email); 
            console.log(msg); // Optionally log the success message
            // Redirect to the home page upon sucessfull login
            navigate('/');

        } else {
            // Handle invalid credentials or other login errors
            console.error(msg);
            // Optionally display an error message to the user
        }
    } catch (error) {
        // Handle network errors or other exceptions
        console.error('Error logging in:', error.message);
        // Optionally display an error message to the user
    }
};

  const handleChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors
  };
};

export default useLoginForm;
