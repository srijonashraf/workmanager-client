import React, { useContext, useEffect, useState } from "react";
import { successToast, errorToast } from "../../helper/ToasterHelper";
import {
  Container,
  Form,
  FormControl,
  InputGroup,
  Button,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { RecoverVerifyEmail } from "../../apiRequest/apiRequest";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import OtpContext from "../../context/OtpContext";
import { getToken } from "../../helper/SessionHelper";

const SendOTP = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { setOtpSent, setOtpEmail } = useContext(OtpContext);

  const emailParam = useParams().email;
  const navigate = useNavigate();
  const userLoggedIn = getToken();

  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [emailParam]);

  const SendOTPRequest = async (e) => {
    e.preventDefault();

    try {
      if (email.length === 0) {
        errorToast("Please fill the email field");
        return;
      }

      setLoading(true);
      const response = await RecoverVerifyEmail(email);

      if (response) {
        if (response.data.status === "success") {
          setOtpSent(true);
          setOtpEmail(email);
          successToast("Check email for verification code");
          userLoggedIn
            ? navigate("/verifyOTP/from_profile")
            : navigate("/verifyOTP/from_forget_password");
        } else if (response.data.status === "fail") {
          errorToast("User not found");
        }
      } else {
        errorToast("Failed to connect to the server");
      }
    } catch (error) {
      errorToast("An unexpected error occurred");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container>
        <Row className="justify-content-center center-screen">
          <Col xs={12} md={6} lg={5}>
            <Card className="border-0 rounded-4 mx-auto shadow">
              <Card.Body>
                <h4 className="mb-3">
                  {emailParam ? "Verify Email" : "Forget Password"}
                </h4>
                <p className="md-text">
                  Please provide your email address, and we will send you an OTP
                  for verification.
                </p>
                <Form onSubmit={SendOTPRequest} className="animated fadeInUp">
                  <InputGroup className="mb-3">
                    <FormControl
                      type="email"
                      disabled={emailParam}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                    />
                  </InputGroup>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Next"}
                  </Button>
                  <Button variant="dark" type="button" className="w-100 mt-3">
                    {userLoggedIn ? (
                      <NavLink className="nav-link" to="/">
                        Return To Home
                      </NavLink>
                    ) : (
                      <NavLink className="nav-link" to="/login">
                        Return To Login
                      </NavLink>
                    )}
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

export default SendOTP;
