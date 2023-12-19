import React, { useState } from "react";
import { UserRegistrationRequest } from "../apiRequest/apiRequest.js";
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

const Register = () => {
  const [formValues, setFormValues] = useState({
    employeeId: "",
    email: "",
    firstName: "",
    lastName: "",
    mobile: "",
    password: "",
    address: "",
    position: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      if (
        Object.values(formValues).some((value) => value.trim().length === 0)
      ) {
        errorToast("Please fill in all the fields.");
        setValidationError(true);
        return;
      }

      setLoading(true);
      const success = await UserRegistrationRequest(formValues);
      if (success) {
        window.location.href = "/";
        successToast("Registration Successful.");
      } else {
        errorToast("Failed to register user.");
        setValidationError(true);
      }
    } catch (error) {
      errorToast("Failed to connect to the server.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleInputFocus = () => {
    setValidationError(false);
  };

  return (
    <div>
      <Toaster position="bottom-center" />
      <Container>
        <Row className="justify-content-md-center my-5">
          <Col
            xs={12}
            md={6}
            lg={5}
            className="card p-4 border-0 shadow rounded-4 mx-auto"
          >
            <Form
              onSubmit={registerUser}
              className="animated fadeInUp card-body"
            >
              <h4 className="mb-3">SIGN UP</h4>
              <InputGroup className="mb-3">
                <FormControl
                  type="text"
                  placeholder="Employee ID"
                  name="employeeId"
                  value={formValues.employeeId}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  style={{
                    borderColor:
                      validationError &&
                      formValues.employeeId.trim().length === 0
                        ? "red"
                        : "",
                  }}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <FormControl
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  style={{
                    borderColor:
                      validationError && formValues.email.trim().length === 0
                        ? "red"
                        : "",
                  }}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <FormControl
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  style={{
                    borderColor:
                      validationError &&
                      formValues.firstName.trim().length === 0
                        ? "red"
                        : "",
                  }}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <FormControl
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  style={{
                    borderColor:
                      validationError && formValues.lastName.trim().length === 0
                        ? "red"
                        : "",
                  }}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <FormControl
                  type="tel"
                  placeholder="Mobile"
                  name="mobile"
                  value={formValues.mobile}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  style={{
                    borderColor:
                      validationError && formValues.mobile.trim().length === 0
                        ? "red"
                        : "",
                  }}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <FormControl
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  style={{
                    borderColor:
                      validationError && formValues.password.trim().length === 0
                        ? "red"
                        : "",
                  }}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <FormControl
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={formValues.address}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  style={{
                    borderColor:
                      validationError && formValues.address.trim().length === 0
                        ? "red"
                        : "",
                  }}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <FormControl
                  type="text"
                  placeholder="Position"
                  name="position"
                  value={formValues.position}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  style={{
                    borderColor:
                      validationError && formValues.position.trim().length === 0
                        ? "red"
                        : "",
                  }}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <FormControl
                  type="text"
                  placeholder="Department"
                  name="department"
                  value={formValues.department}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  style={{
                    borderColor:
                      validationError &&
                      formValues.department.trim().length === 0
                        ? "red"
                        : "",
                  }}
                />
              </InputGroup>

              <Button
                onClick={registerUser}
                variant="primary"
                type="submit"
                className="w-100 mb-3"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </Button>

              <Row className="float-end mt-3">
                <span>
                  <NavLink
                    className="text-center h6 animated fadeInUp"
                    to="/login"
                  >
                    Already have an account? Login
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

export default Register;
