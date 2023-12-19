import React, { Fragment } from "react";
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
import RegisterPage from './page/RegisterPage';

function App() {
  const loggedIn = isLoggedIn();

  if (loggedIn) {
    return (
      <Fragment>
        <Router>
          <AppNavbar />
          <Routes>
            <Route exact path="/task" element={<TaskPage />} />
            <Route exact path="/project" element={<ProjectPage />} />
            <Route exact path="/dashboard" element={<HomePage />} />
            <Route exact path="/" element={<HomePage />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Router>
          <Routes>
            <Route exact path="*" element={<LoginPage />} />
            <Route exact path="/register" element={<RegisterPage />} />
          </Routes>
        </Router>
      </Fragment>
    );
  }
}

export default App;
