import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

function CreateCustomerForm() {
  const [customerFormData, setFormData] = useState({
    givenName: '',
    surName: '',
    email: '',
    afm: '',
    phoneNumbers: [{ number: '', type: '' }],
    address: { street: '', city: '', number: '', zipCode: '' },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split('.');
    if (field) {
      setFormData({
        ...customerFormData,
        [section]: {
          ...customerFormData[section],
          [field]: value,
        },
      });
    } else {
      setFormData({ ...customerFormData, [name]: value });
    }
  };

  const handlePhoneNumberChange = (index, e) => {
    const { name, value } = e.target;
    const newPhoneNumbers = [...customerFormData.phoneNumbers];
    newPhoneNumbers[index][name] = value;
    setFormData({ ...customerFormData, phoneNumbers: newPhoneNumbers });
  };

  const addPhoneNumber = () => {
    setFormData({
      ...customerFormData,
      phoneNumbers: [...customerFormData.phoneNumbers, { number: '', type: '' }],
    });
  };

  const removePhoneNumber = (index) => {
    const newPhoneNumbers = customerFormData.phoneNumbers.filter((_, i) => i !== index);
    setFormData({ ...customerFormData, phoneNumbers: newPhoneNumbers });
  };

  const [submissionStatus, setSubmissionStatus] = useState({
    success: false,
    error: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/customer/create', customerFormData)
      .then((response) => {
        setSubmissionStatus({ success: true, error: null });
        console.log(response.data);
      })
      .catch((error) => {
        setSubmissionStatus({ success: false, error: error.message });
        console.error(error);
      });
  };

  return (
    <Container className="section is-fullheight">
      <div className="column is-6 is-offset-3">
        <div className="box">
          <h1 className="mb-4 text-center">Create Customer</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGivenName">
              <Form.Label>Given Name</Form.Label>
              <Form.Control
                type="text"
                name="givenName"
                value={customerFormData.givenName}
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
                value={customerFormData.surName}
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
                value={customerFormData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAfm">
              <Form.Label>AFM</Form.Label>
              <Form.Control
                type="text"
                name="afm"
                value={customerFormData.afm}
                onChange={handleChange}
                placeholder="AFM"
                required
              />
            </Form.Group>
            {customerFormData.phoneNumbers.map((phoneNumber, index) => (
              <div key={index}>
                <Form.Group className="mb-3" controlId={`formPhoneNumber${index}`}>
                  <Form.Label>Phone Number {index + 1}</Form.Label>
                  <Form.Control
                    type="tel"
                    name="number"
                    value={phoneNumber.number}
                    onChange={(e) => handlePhoneNumberChange(index, e)}
                    placeholder="Phone Number"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId={`formPhoneType${index}`}>
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={phoneNumber.type}
                    onChange={(e) => handlePhoneNumberChange(index, e)}
                    placeholder="Type"
                    required
                  />
                </Form.Group>
                {customerFormData.phoneNumbers.length > 1 && (
                  <Button variant="danger" onClick={() => removePhoneNumber(index)}>
                    Remove Phone Number
                  </Button>
                )}
              </div>
            ))}
            <Button variant="secondary" onClick={addPhoneNumber}>
              Add Phone Number
            </Button>
            <Form.Group className="mb-3" controlId="formAddressStreet">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                name="address.street"
                value={customerFormData.address.street}
                onChange={handleChange}
                placeholder="Street"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAddressCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="address.city"
                value={customerFormData.address.city}
                onChange={handleChange}
                placeholder="City"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAddressNumber">
              <Form.Label>Number</Form.Label>
              <Form.Control
                type="text"
                name="address.number"
                value={customerFormData.address.number}
                onChange={handleChange}
                placeholder="Number"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAddressZipCode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                name="address.zipCode"
                value={customerFormData.address.zipCode}
                onChange={handleChange}
                placeholder="Zip Code"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="button is-block is-info is-fullwidth">
              Submit
            </Button>
            {submissionStatus.success ? (
              <p style={{ color: 'green' }}>Customer created successfully!</p>
            ) : (
              submissionStatus.error && (
                <p style={{ color: 'red' }}>Error: {submissionStatus.error}</p>
              )
            )}
          </Form>
        </div>
      </div>
    </Container>
  );
}

export default CreateCustomerForm;
