import React from "react";
import { getOTPRequested } from "../../helper/SessionHelper";

const VerifyOTP = () => {
  // Check if the user has initiated the OTP verification process
  const otpRequested = getOTPRequested();

  if (!otpRequested) {
    // Redirect the user to the SendOTP page if not initiated the process
    window.location.href = "/sendOTP";
  }

  //SessionStorage of OTP should be cleared after successful landing

  // Render the VerifyOTP component content here

  return <div>{/* VerifyOTP component content */}</div>;
};

export default VerifyOTP;
