import Button from "react-bootstrap/Button";
import { Container, Nav, Navbar, Form, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const AppNavbar = () => {
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-dark-subtle"
        data-bs-theme="dark"
      >
        <Container>
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
                Tasks
              </NavLink>
              <NavLink className="nav-link" to="/project">
                Projects
              </NavLink>
            </Nav>
            <Nav>
              <Form inline>
                <Row>
                  <Col xs="auto">
                    <Form.Control
                      type="text"
                      placeholder="Search"
                      className=" mr-sm-2"
                    />
                  </Col>
                  <Col xs="auto">
                    <Button type="submit">Search</Button>
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
