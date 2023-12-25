class SessionHelper {
  setToken(token) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  setOTPRequested(value) {
    localStorage.setItem("otpRequested", JSON.stringify(value));
  }

  getOTPRequested() {
    return JSON.parse(localStorage.getItem("otpRequested")) || false;
  }

  setOTP(value) {
    localStorage.setItem("otp", JSON.stringify(value));
  }

  getOTP() {
    return JSON.parse(localStorage.getItem("otp")) || false;
  }

  setOTPEmail(otpEmail) {
    localStorage.setItem("otpEmail", JSON.stringify(otpEmail));
  }

  getOTPEmail() {
    return JSON.parse(localStorage.getItem("otpEmail"));
  }

  setUserEmail(email) {
    localStorage.setItem("email", email);
  }

  getUserEmail() {
    return localStorage.getItem("email");
  }

  setNewUser(value) {
    localStorage.setItem("newUser", value);
  }
  getNewUser() {
    return JSON.parse(localStorage.getItem("newUser")) || null;
  }

  setFName(fname) {
    localStorage.setItem("FirstName", fname);
  }

  getFName() {
    return JSON.parse(localStorage.getItem("FirstName")) || null;
  }
  clearSessions() {
    localStorage.clear();
    window.location.href = "/";
  }

}

export const {
  setToken,
  getToken,
  clearSessions,
  setUserEmail,
  getUserEmail,
  setFName,
  getFName,
  setOTPRequested,
  getOTPRequested,
  setOTPEmail,
  getOTPEmail,
  setOTP,
  getOTP,
  setNewUser,
  getNewUser
} = new SessionHelper();
