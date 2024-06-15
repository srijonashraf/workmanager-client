import Cookies from "js-cookie";
class SessionHelper {
  setToken(token) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return Cookies.get("token");
  }

  setLoggedIn(value) {
    localStorage.setItem("loggedIn", value);
  }
  getLoggedIn() {
    return JSON.parse(localStorage.getItem("loggedIn")) || null;
  }

  setFName(fname) {
    localStorage.setItem("FirstName", fname);
  }

  getFName() {
    return JSON.parse(localStorage.getItem("FirstName")) || null;
  }

  setExpireMessage(value) {
    localStorage.setItem("expireMessage", value);
  }
  getExpireMessage() {
    return JSON.parse(localStorage.getItem("expireMessage")) || null;
  }
  clearSessions() {
    localStorage.clear();
    sessionStorage.clear();
    Cookies.remove("token");
    window.location.href = "/";
  }
}

export const {
  setToken,
  getToken,
  clearSessions,
  setFName,
  getFName,
  setLoggedIn,
  getLoggedIn,
  setExpireMessage,
  getExpireMessage,
} = new SessionHelper();
