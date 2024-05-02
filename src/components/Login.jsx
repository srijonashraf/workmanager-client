import React, { useEffect, useState } from "react";
import { UserLogin, GoogleSignIn } from "../apiRequest/apiRequest.js";
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
import { Auth, Provider } from "../../firebase.js";
import { signInWithPopup } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { getExpireMessage, setExpireMessage } from "../helper/SessionHelper.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [googleAuthValue, setGoogleAuthValue] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    if (getExpireMessage()) {
      errorToast("Session Expired. Please login again");
      setExpireMessage(false);
    }
  }, [getExpireMessage()]);

  const UserLoginRequest = async (e) => {
    e.preventDefault();

    try {
      if (email.length === 0 || password.length === 0) {
        errorToast("Please fill in all the fields");
        setValidationError(true);
        return;
      }

      setLoading(true);
      const success = await UserLogin(email, password);
      if (!success) {
        errorToast("User not found");
        setValidationError(true);
      }
      if (success) {
        window.location.href = "/";
        successToast("Login successful");
      }
    } catch (error) {
      errorToast("Failed to connect to the server");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const HandleInputFocus = () => {
    setValidationError(false);
  };

  const HandleGoogleSignIn = async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(Auth, Provider);
      const displayName = result.user.displayName;

      // Extract first and last names
      const nameParts = displayName.split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ");

      // Set state values
      setGoogleAuthValue({
        email: result.user.email,
        firstName: firstName,
        lastName: lastName,
      });

      const success = await GoogleSignIn({
        email: result.user.email,
        firstName: firstName,
        lastName: lastName,
      });

      if (success) {
        successToast("Login successful");
        window.location.href = "/";
      }
    } catch (error) {
      errorToast("Failed to connect to the server");
      console.error("Google sign-in failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Toaster position="bottom-center" />
      <Container>
        <Row className="justify-content-md-center">
          <Col
            xs={12}
            md={6}
            lg={5}
            className="card p-4 border-0 shadow rounded-4 mx-auto" // Add mx-auto for centering
          >
            <Form
              onSubmit={UserLoginRequest}
              className="animated fadeInUp card-body"
            >
              <h4 className="mb-3">SIGN IN</h4>
              <InputGroup className="mb-3">
                <FormControl
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={HandleInputFocus}
                  style={{ borderColor: validationError ? "red" : "" }}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <FormControl
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={HandleInputFocus}
                  style={{ borderColor: validationError ? "red" : "" }}
                />
              </InputGroup>
              <Button
                onClick={UserLoginRequest}
                variant="primary"
                type="submit"
                className="w-100 mb-3 rounded-1"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              <Button
                onClick={HandleGoogleSignIn}
                variant="dark"
                type="button"
                className="w-100 mb-3 rounded-1"
                disabled={loading}
              >
                <FaGoogle className="mx-2" />
                {loading ? "Logging in..." : "Sign in with Google"}
              </Button>

              <Row className="float-end mt-3">
                <span>
                  <NavLink
                    className="text-center h6 animated fadeInUp"
                    to="/register"
                  >
                    Sign Up{" "}
                  </NavLink>
                  <span className="mx-1">|</span>
                  <NavLink
                    className="text-center h6 animated fadeInUp"
                    to="/sendOTP"
                  >
                    Forget Password
                  </NavLink>
                </span>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
