import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import {
  Container,
  Nav,
  Navbar,
  Form,
  InputGroup,
  FormControl,
  Offcanvas,
} from "react-bootstrap";
import { clearSessions } from "../helper/SessionHelper";
import { NavLink } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { RiMenuUnfoldFill } from "react-icons/ri";

const AppNavbar = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const closeOffcanvas = () => {
    setShowOffcanvas(false);
  };

  return (
    <div className={`app-container ${showOffcanvas ? "offcanvas-open" : ""}`}>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-dark-subtle"
        data-bs-theme="dark"
      >
        <Container className="my-2 my-lg-0">
          <RiMenuUnfoldFill
            className="text-warning mx-2 cursorPointer fs-5"
            onClick={toggleOffcanvas}
          />
          <NavLink to={"/"} className="navbar-brand">
            Work Manager
          </NavLink>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto justify-content-center flex-grow-1">
              <NavLink className="nav-link" to="/task">
                New Task
              </NavLink>
              <NavLink className="nav-link" to="/allTask">
                All Task
              </NavLink>
            </Nav>
            <Form className="d-flex align-items-center">
              <InputGroup className="me-2">
                <FormControl type="text" placeholder="Search" />
                <Button variant="primary">Search</Button>
              </InputGroup>
              <Button onClick={clearSessions} variant="danger">
                Logout
              </Button>
              <BiUserCircle
                className="navBarUserIcon"
                onClick={() => (window.location.href = "/profile")}
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas show={showOffcanvas} onHide={closeOffcanvas} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Side Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="list-group list-group-flush list-unstyled">
            <li>
              <NavLink to="/" className="list-group-item border-0 rounded-1" onClick={closeOffcanvas}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/task"
                className="list-group-item border-0 rounded-1"
                onClick={closeOffcanvas}
              >
                New Task
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pending"
                className="list-group-item border-0 rounded-1"
                onClick={closeOffcanvas}
              >
                Pending
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/inProgress"
                className="list-group-item border-0 rounded-1"
                onClick={closeOffcanvas}
              >
                In Progress
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/done"
                className="list-group-item border-0 rounded-1"
                onClick={closeOffcanvas}
              >
                Done
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cencelled"
                className="list-group-item border-0 rounded-1"
                onClick={closeOffcanvas}
              >
                Cancelled
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className="list-group-item border-0 rounded-1"
                onClick={closeOffcanvas}
              >
                Settings
              </NavLink>
            </li>
            <Button onClick={clearSessions} className="d-flex" variant="danger">
                Logout
              </Button>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default AppNavbar;
