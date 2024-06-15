import React, { useContext } from "react";
import OtpContext from "./../../context/OtpContext";
import { Navigate } from "react-router-dom";

const ProtectedVerifyOtp = ({ children }) => {
  const { otpSent } = useContext(OtpContext);
  if (!otpSent) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedVerifyOtp;
