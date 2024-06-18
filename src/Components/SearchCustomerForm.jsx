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
    <Container className="section is-fullheight">
      <Row className="justify-content-md-center mt-8">
        <Col md={10}>
          <Card >
            <Card.Header as="h4" className='bg-dark text-bg-primary' 
            // style={{ height: '80px', paddingTop: '20px' }}
            >Search Customer</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSearch}>xs
                <Row className="mb-3">
                <Form.Group as={Col} controlId="id">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter ID"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="afm">
                    <Form.Label>AFM</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter AFM"
                      value={afm}
                      onChange={(e) => setAfm(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                </Row>
                <Row className="justify-content-end">
                  <Col className="text-end">
                    <Button variant="primary" type="submit">
                      Search
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {results.length === 0 && (
        <Row className="justify-content-md-center mt-5">
          <Col md={10}>
            <p className="text-center mt-4">{noResultsMessage}</p>
          </Col>
        </Row>
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
      {error && (
        <Row className="justify-content-md-center mt-5">
          <Col md={10}>
            <p className="text-center text-danger mt-4">{error}</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default SearchCustomerForm;