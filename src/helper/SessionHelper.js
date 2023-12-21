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

  setLoggedIn(value) {
    localStorage.setItem("isLoggedIn", JSON.stringify(value));
  }

  isLoggedIn() {
    return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  }
}

export const {
  setToken,
  getToken,
  clearSessions,
  setLoggedIn,
  isLoggedIn,
  setUserEmail,
  getUserEmail,
  setFName,
  getFName,
  setOTPRequested,
  getOTPRequested,
  setOTPEmail,
  getOTPEmail,
} = new SessionHelper();
