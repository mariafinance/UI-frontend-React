import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import backgroundImg from '../assets/background.jpg';

const AboutProject = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login'); // Redirect to login page
  };

  const backgroundImageStyle = {
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: 'calc(100vh - 70px)', // Adjust 70px according to your navbar height
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  };

  return (
    <div style={backgroundImageStyle}>
      <Container className="py-5 text-center text-white">
        <h1>About MarCus</h1>
        <p>
          I am Maria Michail & this is my Project for Coding Factory 5. This is a customer Management App that you can perform CRUD actions. You can create, read, update and delete a customer. To navigate and work with MarCus app you need to login first.
        </p>
        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>
      </Container>
    </div>
  );
};

export default AboutProject;
