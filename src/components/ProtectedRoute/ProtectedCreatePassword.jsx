import React, { useContext } from "react";
import OtpContext from "./../../context/OtpContext";
import { Navigate } from "react-router-dom";

const ProtectedCreatePassword = ({ children }) => {
  const { otpVerified } = useContext(OtpContext);
  if (!otpVerified) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedCreatePassword;
