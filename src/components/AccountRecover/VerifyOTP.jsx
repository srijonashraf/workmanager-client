import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { successToast, errorToast } from "../../helper/ToasterHelper";
import { VerifyOTP as VerifyOTPApi } from "../../apiRequest/apiRequest";
import VerificationInput from "react-verification-input";
import {
  getOTPRequested,
  getOTPEmail,
  setOTP as setOTPFunction
} from "../../helper/SessionHelper";

const VerifyOTP = () => {
  const otpRequested = getOTPRequested();
  const otpEmail = getOTPEmail();
  if (!otpRequested) {
    window.location.href = "/";
  }

  const [OTP, setOTP] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    try {
      if (OTP.length !== 6) {
        errorToast("Please enter a valid 6-digit OTP");
        return;
      }

      setLoading(true);
      const response = await VerifyOTPApi(OTP, otpEmail);

      if (response) {
        if (response.data.status === "success") {
          successToast("Verification Complete");
          setOTPFunction(OTP);
          setTimeout(() => {
            window.location.href = "/createPassword";
          }, 2000);
        } else if (response.data.status === "fail") {
          errorToast("OTP not matched");
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
      <Toaster position="bottom-center" />
      <Container>
        <Row className="justify-content-center center-screen">
          <Col xs={12} md={6} lg={5}>
            <Card className="border-0 rounded-4 mx-auto shadow p-3">
              <Card.Body>
                <h4 className="mb-3">OTP Verification</h4>
                <Form
                  onSubmit={handleVerifyOTP}
                  className="animated fadeInUp d-flex flex-column gap-3 align-items-center"
                >
                  <VerificationInput
                    onChange={(value) => setOTP(value)}
                    // inputStyle={defaultInputStyle}
                    fields={6}
                    classNames="text-center"
                  />
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    disabled={loading || OTP.length !== 6}
                  >
                    {loading ? "Loading..." : "Next"}
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

export default VerifyOTP;
