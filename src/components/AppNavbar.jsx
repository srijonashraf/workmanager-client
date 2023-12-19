import Button from "react-bootstrap/Button";
import { Container, Nav, Navbar, Form, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { clearSessions } from "../helper/SessionHelper";
const AppNavbar = () => {
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-dark-subtle"
        data-bs-theme="dark"
      >
        <Container className="my-2 my-lg-0">
          <NavLink to={"/"} className="navbar-brand">
            Work Manager
          </NavLink>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto justify-content-center flex-grow-1">
              <NavLink className="nav-link" to="/dashboard">
                Dashboard
              </NavLink>
              <NavLink className="nav-link" to="/task">
                New Task
              </NavLink>
              <NavLink className="nav-link" to="/allTask">
                All Task
              </NavLink>
            </Nav>
            <Nav>
              <Form>
                <Row>
                  <Col xs="auto">
                    <Form.Control
                      type="text"
                      placeholder="Search"
                      className="mr-sm-2"
                    />
                  </Col>
                  <Col xs="auto"  className="mb-3 mb-sm-0">
                    <Button type="submit">Search</Button>
                  </Col>
                  <Col xs="auto">
                    <button
                      onClick={clearSessions}
                      type="button"
                      className="btn btn-outline-danger"
                    >
                      Logout
                    </button>
                  </Col>
                </Row>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
