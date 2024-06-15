import React, { useContext, useState } from "react";
import { Container, FormControl, InputGroup, Button } from "react-bootstrap";
import { Row, Col, Card, Form } from "react-bootstrap";
import { RecoverPassword } from "../../apiRequest/apiRequest";
import { successToast, errorToast } from "../../helper/ToasterHelper";
import OtpContext from "../../context/OtpContext";
import { useNavigate } from "react-router-dom";
import { clearSessions } from "../../helper/SessionHelper";

const CreatePassword = () => {
  const [initialPass, setInitialPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  const { otpEmail, otp } = useContext(OtpContext);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setInitialPass(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPass(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (initialPass !== confirmPass) {
      console.error("Passwords do not match");
      errorToast("Passwords do not match");
      return confirmPass;
    }

    try {
      setLoading(true);
      const response = await RecoverPassword(otpEmail, otp, confirmPass);
      if (response && response.data.status === "success") {
        successToast("Password Changed Successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        errorToast("Failed to change password. Please try again.");
      }
    } catch (error) {
      console.error("Failed to change password:", error);
      errorToast("Failed to change password. Please try again.");
    } finally {
      setLoading(false);
      clearSessions();
    }
  };

  return (
    <div>
      <Container>
        <Row className="justify-content-center center-screen">
          <Col xs={12} md={6} lg={5}>
            <Card className="border-0 rounded-4 mx-auto shadow p-3">
              <Card.Body>
                <h4>Create New Password</h4>
                <Form onSubmit={handleSubmit}>
                  <InputGroup className="mb-3">
                    <FormControl
                      type="password"
                      placeholder="Enter New Password"
                      onChange={handlePasswordChange}
                      value={initialPass}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <FormControl
                      type="password"
                      placeholder="Confirm Password"
                      onChange={handleConfirmPasswordChange}
                      value={confirmPass}
                    />
                  </InputGroup>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Submit"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreatePassword;
