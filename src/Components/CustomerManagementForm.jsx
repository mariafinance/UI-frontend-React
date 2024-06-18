import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button, Modal, Form, Alert } from 'react-bootstrap';

const CustomerManagementForm = () => {
  const [customers, setCustomers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/customer/search');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setError('Error fetching customers. Please try again.');
    }
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowEditModal(true);
  };

  const handleDeleteCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowDeleteModal(true);
  };

  const handleUpdateCustomer = async () => {
    try {
      await axios.put(`http://localhost:5000/customer/${selectedCustomer._id}`, selectedCustomer);
      fetchCustomers();
      setShowEditModal(false);
      setError('');
      setSuccessMessage('Customer updated successfully!');
    } catch (error) {
      console.error('Error updating customer:', error);
      setError('Error updating customer. Please try again.');
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/customer/${selectedCustomer._id}`);
      fetchCustomers();
      setShowDeleteModal(false);
      setError('');
    } catch (error) {
      console.error('Error deleting customer:', error);
      setError('Error deleting customer. Please try again.');
    }
  };

  return (
    <Container className="mt-4">
      {successMessage && (
        <Alert variant="success">
          {successMessage}
        </Alert>
      )}
      <Row className="justify-content-md-center">
        <Col md={12}>
          <h2>Customer Management</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Given Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>AFM</th>
                <th>Phone Numbers</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer._id}</td>
                  <td>{customer.givenName}</td>
                  <td>{customer.surName}</td>
                  <td>{customer.email}</td>
                  <td>{customer.afm}</td>
                  {/* <td>
                    {customer.phoneNumbers.map((phone, index) => (
                      <div key={index}>
                        <Form.Control
                          type="text"
                          value={phone.number}
                          onChange={(e) => {
                            const updatedPhoneNumbers = [...customer.phoneNumbers];
                            updatedPhoneNumbers[index] = { ...updatedPhoneNumbers[index], number: e.target.value };
                            handleEditCustomer({ ...customer, phoneNumbers: updatedPhoneNumbers });
                          }}
                        />
                      </div>
                    ))}
                  </td> */}
                  <td>
                    {customer.phoneNumbers.map((phone, index) => (
                      <div key={index}>
                        {/* Render plain text for phone number */}
                        <span>{phone.number}</span>
                      </div>
                    ))}
                  </td>
                  {/*}
                  <td>
                    <div>
                      <Form.Control
                        type="text"
                        placeholder="Street"
                        value={customer.address?.street || ''}
                        onChange={(e) =>
                          handleEditCustomer({
                            ...customer,
                            address: { ...customer.address, street: e.target.value },
                          })
                        }
                      />
                      <Form.Control
                        type="text"
                        placeholder="City"
                        value={customer.address?.city || ''}
                        onChange={(e) =>
                          handleEditCustomer({
                            ...customer,
                            address: { ...customer.address, city: e.target.value },
                          })
                        }
                      />
                      <Form.Control
                        type="text"
                        placeholder="Number"
                        value={customer.address?.number || ''}
                        onChange={(e) =>
                          handleEditCustomer({
                            ...customer,
                            address: { ...customer.address, number: e.target.value },
                          })
                        }
                      />
                      <Form.Control
                        type="text"
                        placeholder="zip Code"
                        value={customer.address?.zipCode || ''}
                        onChange={(e) =>
                          handleEditCustomer({
                            ...customer,
                            address: { ...customer.address, zipCode: e.target.value },
                          })
                        }
                      />
                    </div>
                  </td> 
                  */}
                  <td>
                    <div>
                      {/* Render plain text for address */}
                      <span>Street: {customer.address?.street || ""}</span>
                      <br />
                      <span>City: {customer.address?.city || ""}</span>
                      <br />
                      <span>Number: {customer.address?.number || ""}</span>
                      <br />
                      <span>Zip Code: {customer.address?.zipCode || ""}</span>
                    </div>
                  </td>

                  <td className="d-flex justify-content-around">
                    <Button
                      variant="warning"
                      onClick={() => handleEditCustomer(customer)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteCustomer(customer)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Edit Customer Modal */}
      {selectedCustomer && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="givenName">
                <Form.Label>Given Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedCustomer.givenName}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      givenName: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="surName">
                <Form.Label>Surname</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedCustomer.surName}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      surName: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={selectedCustomer.email}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      email: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="afm">
                <Form.Label>AFM</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedCustomer.afm}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      afm: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="phoneNumbers">
                <Form.Label>Phone Numbers</Form.Label>
                {selectedCustomer.phoneNumbers.map((phone, index) => (
                  <Form.Control
                    key={index}
                    type="text"
                    value={phone.number}
                    onChange={(e) => {
                      const updatedPhoneNumbers = [
                        ...selectedCustomer.phoneNumbers,
                      ];
                      updatedPhoneNumbers[index] = {
                        ...updatedPhoneNumbers[index],
                        number: e.target.value,
                      };
                      setSelectedCustomer({
                        ...selectedCustomer,
                        phoneNumbers: updatedPhoneNumbers,
                      });
                    }}
                  />
                ))}
              </Form.Group>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Street"
                  value={selectedCustomer.address?.street || ""}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      address: {
                        ...selectedCustomer.address,
                        street: e.target.value,
                      },
                    })
                  }
                />
                <Form.Control
                  type="text"
                  placeholder="City"
                  value={selectedCustomer.address?.city || ""}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      address: {
                        ...selectedCustomer.address,
                        city: e.target.value,
                      },
                    })
                  }
                />
                <Form.Control
                  type="text"
                  placeholder="Number"
                  value={selectedCustomer.address?.number || ""}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      address: {
                        ...selectedCustomer.address,
                        number: e.target.value,
                      },
                    })
                  }
                />
                <Form.Control
                  type="text"
                  placeholder="zip Code"
                  value={selectedCustomer.address?.zipCode || ""}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      address: {
                        ...selectedCustomer.address,
                        zipCode: e.target.value,
                      },
                    })
                  }
                />
              </Form.Group>
              <Button variant="primary" onClick={handleUpdateCustomer}>
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}

      {/* Delete Customer Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this customer?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CustomerManagementForm;
