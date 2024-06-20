import Cookies from "js-cookie";
class SessionHelper {
  setToken(token) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return Cookies.get("token");
  }

  clearSessions() {
    localStorage.clear();
    sessionStorage.clear();
    Cookies.remove("token");
    window.location.href = "/";
  }
}

export const { setToken, getToken, clearSessions } = new SessionHelper();
