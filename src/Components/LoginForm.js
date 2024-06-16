import React, { useState } from "react";
import useForm from "./useForm";
import validate from "./LoginFormValidationRules";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import UserLoginIcon from "./UserLoginIcon";

const LoginForm = props => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    validate
  );
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  async function login() {
    try {
        const response = await axios.post('http://localhost:5000/user/login', {
            email: values.email,
            password: values.password
        });
        const { access_token, msg, email } = response.data;
        if (access_token) {
            // Login successful, store the JWT token in localStorage or sessionStorage
            localStorage.setItem('access_token', access_token);
            console.log(msg); // Optionally log the success message
            // Update loggedInUser state with username
             //setLoggedInUser({ email });
        // // Fetch user information after successful login
        //   axios.get('/api/user')
        //     .then(response => {
        //       if (response.data.username) {
        //         setLoggedInUser(response.data);
        //         props.parentCallback(true); // Assuming this is to notify parent of login state
                navigate('/'); // Redirect to default page after login
        //       }
        //     })
        //     .catch(error => {
        //       console.error('Error fetching user:', error);
        //     });
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

  return (
    <div className="section is-fullheight">
      <div className="container">
        <div className="column is-6 is-offset-3">
          <div className="box">
            <h1 className="mb-4 text-center">Login</h1>
            <form onSubmit={handleSubmit} Validate>
              <div className="field">
                <label className="label">Email Address</label>
                <div className="control">
                  <input
                    autoComplete="off"
                    className={`input ${errors.email && "is-danger"}`}
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={values.email || ""}
                    required
                  />
                  {errors.email && (
                    <p className="help is-danger">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className={`input ${errors.password && "is-danger"}`}
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={values.password || ""}
                    required
                  />
                </div>
                {errors.password && (
                  <p className="help is-danger">{errors.password}</p>
                )}
              </div>
              <button
                type="submit"
                className="button is-block is-info is-fullwidth"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
      {loggedInUser && <UserLoginIcon loggedInUser={loggedInUser} />}
    </div>
  );
};

export default LoginForm;
