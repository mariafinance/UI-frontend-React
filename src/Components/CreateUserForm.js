import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

function CreateUserForm() {
  const [formData, setFormData] = useState({
    givenName: '',
    surName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add code to handle form submission (e.g., send data to server)
    console.log('Form submitted:', formData);
  };

  return (
    <Container className="section is-fullheight">
      <div className="column is-6 is-offset-3">
        <div className="box">
          <h1 className="mb-4 text-center">Register New User</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGivenName">
              <Form.Label className="">Given Name</Form.Label>
              <Form.Control
                type="text"
                name="givenName"
                value={formData.givenName}
                onChange={handleChange}
                placeholder="Given Name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSurName">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                name="surName"
                value={formData.surName}
                onChange={handleChange}
                placeholder="Surname"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="button is-block is-info is-fullwidth">
              Submit
            </Button>
          </Form>
        </div>
      </div>    
    </Container>
  );
}

export default CreateUserForm;
