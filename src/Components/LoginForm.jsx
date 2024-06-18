import React, { useState } from "react";
import useForm from "./useForm";
import validate from "./LoginFormValidationRules";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Modal } from "react-bootstrap";

const LoginForm = () => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    validate
  );
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
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
        setModalMessage("Login successful.");
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate("/"); // Redirect to home page after successful login
        }, 2000); // Hide modal after 2 seconds
      } else {
        setModalMessage("Invalid username or password.");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
      setModalMessage("Error logging in. Please try again.");
      setShowModal(true);
    }
  }

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="section is-fullheight">
      <div className="container">
        <div className="column is-6 is-offset-3">
          <div className="box">
            <h1 className="mb-4 text-center">Login</h1>
            <Form onSubmit={handleSubmit} noValidate>
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
              <Button
                type="submit"
                className="button is-block is-info is-fullwidth"
              >
                Login
              </Button>
              <p className="mt-4 text-center">
                Don't have an account?{" "}
                <Link to="/create-user">Register here</Link>
              </p>
            </Form>
          </div>
        </div>
      </div>

      {/* Modal for displaying login status */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginForm;
