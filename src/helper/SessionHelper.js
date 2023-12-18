class SessionHelper {
  setToken(token) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
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

export const { setToken, getToken, clearSessions, setLoggedIn, isLoggedIn } =
  new SessionHelper();
