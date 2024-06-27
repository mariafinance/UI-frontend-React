import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Modal } from 'react-bootstrap'; 
import backgroundImg from '../assets/background.jpg';

const Home = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  const toggleModal = () => setShowModal(!showModal); 

  const backgroundImageStyle = {
      backgroundImage: `url(${backgroundImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: 'calc(100vh - 70px)',
      padding: '10px',
  };

  return (
    <div style={backgroundImageStyle}>
      <Container className="py-5">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <div className="text-center text-white">
              <h1>Welcome Home</h1>
              <p>This is my Project for Coding Factory 5. Stay with me to learn more
              <Button variant="primary" onClick={toggleModal} className="ml-3">
                <span className="text-white">Info</span>
              </Button>  or  <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
              </p>
              
            </div>
          </Col>
        </Row>
      </Container>
      {/* Modal for explaining */}
      <Modal show={showModal} onHide={toggleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-black">Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center text-pink">I am Maria Michail and this is my CRUD customer management app. MarCus App name is made from Mar by Maria & Cus by Customers, aka MarCus.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
