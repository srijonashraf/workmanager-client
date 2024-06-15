import React, { useContext, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { successToast, errorToast } from "../../helper/ToasterHelper";
import {
  VerifyOTP as VerifyOTPApi,
  ProfileVerification,
} from "../../apiRequest/apiRequest";
import VerificationInput from "react-verification-input";
import OtpContext from "../../context/OtpContext";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const [OTP, setOTP] = useState("");
  const [loading, setLoading] = useState(false);

  const { otpEmail } = useContext(OtpContext);
  const navigate = useNavigate();

  let locationPathName = useLocation().pathname;

  const { setOtpVerified, setOtp } = useContext(OtpContext);

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    try {
      if (OTP.length !== 6) {
        errorToast("Please enter a valid 6-digit OTP");
        return;
      } else {
        setLoading(true);
        const response = await VerifyOTPApi(OTP, otpEmail);

        if (response && response.data) {
          if (response.data.status === "success") {
            setOtpVerified(true);
            setOtp(OTP);

            if (locationPathName === "/verifyOTP/from_profile") {
              const res = await ProfileVerification(otpEmail);
              if (res) {
                successToast("Verification complete!");
                navigate("/");
              } else {
                errorToast("An unexpected error occurred");
              }
            } else if (locationPathName === "/verifyOTP/from_forget_password") {
              successToast("Verification Complete!");
              navigate("/createPassword");
            }
          } else if (response.data.status === "fail") {
            errorToast("OTP not matched");
          } else {
            errorToast("Unexpected response from the server");
          }
        }
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
            <Card className="border-0 rounded-4 mx-auto shadow p-3">
              <Card.Body>
                <h4 className="mb-3">OTP Verification</h4>
                <Form
                  onSubmit={handleVerifyOTP}
                  className="animated fadeInUp d-flex flex-column gap-3 align-items-center"
                >
                  <VerificationInput
                    onChange={(value) => setOTP(value)}
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
