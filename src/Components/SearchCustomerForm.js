import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Form, Button, Card } from 'react-bootstrap';

const SearchCustomerForm = () => {
  const [afm, setAfm] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [results, setResults] = useState([]);
  const [noResultsMessage, setNoResultsMessage] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/customer/search', {
        params: { afm, email, id },
      });
      if (response.data.length === 0) {
        // If no results are returned
        setResults(response.data);
        console.log("No results found.");
        // Optionally inform the user with a message or UI indication
        setNoResultsMessage("No results found.");
      } else {
        // If results are found
        setResults(response.data);
        setNoResultsMessage(""); // Clear any previous "no results" message
      }
      } catch (error) {
        console.error('Error fetching search results:', error);
        //Optionally set a state to display an error message to the user
        setError('Error fetching search results. Please try again.'); 
      }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={8}>
          <Card>
            <Card.Header as="h5">Search Customer</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSearch}>
                <Form.Group controlId="afm">
                  <Form.Label>AFM</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter AFM"
                    value={afm}
                    onChange={(e) => setAfm(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="email" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="id" className="mt-3">
                  <Form.Label>ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-4">
                  Search
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {results.length === 0 && (<p style={{ textAlign: 'center', marginTop: '20px' }}>{noResultsMessage}</p>
      )}
      {results.length > 0 && (
        <Row className="justify-content-md-center mt-5">
          <Col md={10}>
            <Card>
              <Card.Header as="h5">Search Results</Card.Header>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>AFM</th>
                      <th>Email</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((customer) => (
                      <tr key={customer._id}>
                        <td>{customer._id}</td>
                        <td>{customer.afm}</td>
                        <td>{customer.email}</td>
                        <td>{customer.givenName}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    {/* Displaying error message if there's an error */}
    {error && <p>{error}</p>}
    </Container>
  );
};

export default SearchCustomerForm;
