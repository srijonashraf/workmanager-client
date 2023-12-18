import React, { useState } from "react";
import { UserLoginRequest } from "../apiRequest/apiRequest.js";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {
  Container,
  Form,
  FormControl,
  InputGroup,
  Button,
} from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { successToast, errorToast } from "../helper/ToasterHelper.js";
import { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { isLoggedIn } from "../helper/SessionHelper.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState(false); // New validation state
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      if (email.length === 0 || password.length === 0) {
        errorToast("Please fill all the fields.");
        setValidationError(true); // Set validation error to true
        return;
      }

      setLoading(true);
      const success = await UserLoginRequest(email, password);
      if (success) {
        navigate("/project");
        successToast("Login Successful.");
        isLoggedIn(true);
      } else {
        console.log("Error");
        errorToast("Email or Password Not Found.");
        setValidationError(true);
      }
    } catch (error) {
      errorToast("Failed to connect to the server.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputFocus = () => {
    // Reset validation error when input is focused
    setValidationError(false);
  };

  return (
    <div>
      <Toaster position="bottom-center" />
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6} lg={5} className="card p-4 border-0 shadow rounded-4">
            <Form onSubmit={loginUser} className="animated fadeInUp card-body">
              <h4 className="mb-3">SIGN IN</h4>
              <InputGroup className="mb-3">
                <FormControl
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={handleInputFocus} // Handle input focus
                  style={{ borderColor: validationError ? "red" : "" }}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <FormControl
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={handleInputFocus} // Handle input focus
                  style={{ borderColor: validationError ? "red" : "" }}
                />
              </InputGroup>
              <Button
                onClick={loginUser}
                variant="primary"
                type="submit"
                className="w-100"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
              <Col className="float-end mt-3 d-lg-flex align-items-baseline fw-bold gap-2">
                <NavLink to="/register" className="nav-link">
                  SIGN UP
                </NavLink>
                <span>|</span>
                <NavLink to="/forget" className="nav-link">
                  Forget Password
                </NavLink>
              </Col>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
