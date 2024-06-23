import React, { useState } from "react";
import validate from "./LoginFormValidationRules";
import useLoginForm from "./useLoginForm";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Alert, Form } from "react-bootstrap";

const LoginForm = () => {
  const { values, errors, handleChange, handleSubmit } = useLoginForm(
    login,
    validate
  );
  const [submissionStatus, setSubmissionStatus] = useState({
    success: false,
    message: "",
    error: null,
  });
  const navigate = useNavigate();

  async function login() {
    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        email: values.email,
        password: values.password,
      });
      const { access_token, msg } = response.data;
      if (access_token) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("loggedInEmail", values.email); 
        setSubmissionStatus({ success: true, message: "Login successful.", error: null });
        navigate("/"); // Redirect to home page after successful login
      } else {
        setSubmissionStatus({ success: false, message: "Invalid username or password.", error: null });
        console.error(msg);
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      setSubmissionStatus({ success: false, message: "Error logging in. Please try again.", error: error.message });
    }
  }

  return (
    <div className="section is-fullheight">
      <div className="container">
        <div className="column is-6 is-offset-3">
          <div className="box">
            <h1 className="mb-4 text-center">Login</h1>
            {submissionStatus.message && (
              <Alert variant={submissionStatus.success ? "success" : "danger"}>
                {submissionStatus.message}
              </Alert>
            )}
            <Form onSubmit={handleSubmit} Validate>
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
                  {errors.password && (
                    <p className="help is-danger">{errors.password}</p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="button is-block is-info is-fullwidth"
              >
                Login
              </button>
              <p className="mt-4 text-center">
                Don't have an account?{" "}
                <Link to="/create-user">Register here</Link>
              </p>
              <p>
                {submissionStatus.success ? (
                <p style={{ color: 'green' }}>User created successfully!</p>
              ) : (
                submissionStatus.error && (
                  <p style={{ color: 'red' }}>Error: {submissionStatus.error}</p>
                )
              )}
              </p>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
