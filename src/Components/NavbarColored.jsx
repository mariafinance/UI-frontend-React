import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import UserLoginIcon from "./UserLoginIcon";

function NavbarColored() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login"); 
  };

  const isLoggedIn = !!localStorage.getItem("access_token");

  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ height: "70px", width: "100%", padding: "0" }}
    >
      <Container fluid>
        <Navbar.Brand href="/login" style={{ padding: 0 }}>
          <img
            src={logo}
            height="90%"
            width="135"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as="span">
              <Link to="/" className="text-white text-decoration-none px-3">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link as="span">
              <Link
                to="/about"
                className="text-white text-decoration-none px-3"
              >
                About
              </Link>
            </Nav.Link>
            {!isLoggedIn && (
              <>
                <Nav.Link as="span">
                  <Link
                    to="/create-user"
                    className="text-white text-decoration-none px-3"
                  >
                    User Register
                  </Link>
                </Nav.Link>
                <Nav.Link as="span">
                  <Link
                    to="/login"
                    className="text-white text-decoration-none px-3"
                  >
                    Login
                  </Link>
                </Nav.Link>
              </>
            )}
            {isLoggedIn && (
              <>
                <Nav.Link as="span">
                  <Link
                    to="/createcustomer"
                    className="text-white text-decoration-none px-3"
                  >
                    Create Customer
                  </Link>
                </Nav.Link>
                <Nav.Link as="span">
                  <Link
                    to="/searchcustomer"
                    className="text-white text-decoration-none px-3"
                  >
                    Search Customer
                  </Link>
                </Nav.Link>
                <Nav.Link as="span">
                  <Link
                    to="/customermanagement"
                    className="text-white text-decoration-none px-3"
                  >
                    Customer Management
                  </Link>
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav className="ml-auto">
            {isLoggedIn && <UserLoginIcon />}
            {!isLoggedIn ? (
              <Nav.Link as="span">
                <span
                  onClick={() => navigate("/login")}
                  className="text-white text-decoration-none px-3"
                  style={{ cursor: "pointer" }}
                >
                  <FontAwesomeIcon icon={faUser} />
                </span>
              </Nav.Link>
            ) : (
              <Nav.Link as="span">
                <span
                  onClick={handleLogout}
                  className="text-white text-decoration-none px-3"
                  style={{ cursor: "pointer" }}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </span>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarColored;
