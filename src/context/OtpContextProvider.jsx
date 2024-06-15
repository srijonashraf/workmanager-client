import React, { useState } from "react";
import OtpContext from "./OtpContext";

const OtpContextProvider = ({ children }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <div>
      <OtpContext.Provider
        value={{
          otpSent,
          setOtpSent,
          otpEmail,
          setOtpEmail,
          otpVerified,
          setOtpVerified,
          otp,
          setOtp,
        }}
      >
        {children}
      </OtpContext.Provider>
    </div>
  );
};

export default OtpContextProvider;
