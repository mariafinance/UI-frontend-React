import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserLoginIcon from './UserLoginIcon';

function NavbarColored() {
  return (
    <>
      <Navbar className="sticky-top" expand= "lg" bg="dark" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="#">Navbar Menu</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="me-auto">
            <Nav.Link as = "span">
              <Link to={"/"} className="text-white text-decoration-none px-3">Home</Link>
              </Nav.Link>
            <Nav.Link as = "span">
              <Link to={"/create-user"} className="text-white text-decoration-none px-3"> User Register</Link>
              </Nav.Link>
            <Nav.Link as = "span">
            <Link to={"/login"} className="text-white text-decoration-none px-3">Login</Link>
            </Nav.Link>
            <Nav.Link as = "span">
            <Link to={"/createcustomer"} className="text-white text-decoration-none px-3">Create Customer</Link>
            </Nav.Link>
            <Nav.Link as = "span">
            <Link to={"/searchcustomer"} className="text-white text-decoration-none px-3">Search Customer</Link>
            </Nav.Link>
          </Nav>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
               <UserLoginIcon />
            </Nav>
           </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarColored;