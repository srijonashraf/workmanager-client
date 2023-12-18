import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./page/HomePage.jsx";
import TaskPage from "./page/TaskPage.jsx";
import ProjectPage from "./page/ProjectPage.jsx";
import LoginPage from "./page/LoginPage";
import AppNavbar from "./components/AppNavbar";
import { isLoggedIn } from "./helper/SessionHelper.js";
import Error from "./components/404.jsx";

function App() {
  const loggedIn = isLoggedIn();

  if (loggedIn) {
    return (
      <Router>
        <div>
          <AppNavbar />
          <Routes>
            <Route path="/task" element={<TaskPage />} />
            <Route path="/project" element={<ProjectPage />} />
            <Route path="/dashboard" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </Router>
    );
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* Other Route will also redirect to LoginPage */}
        </Routes>
      </Router>
    );
  }
}

export default App;
