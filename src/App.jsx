import { Fragment } from "react";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import AppNavbar from "./components/AppNavbar";
import { getToken } from "./helper/SessionHelper.js";
import Error from "./components/404.jsx";
import RegistrationPage from "./page/RegistrationPage.jsx";
import NewTaskPage from "./page/NewTaskPage";
import TaskListPage from "./page/TaskListPage.jsx";
import DashboardPage from "./page/DashboardPage.jsx";
import SendOTPPage from "./page/SendOTPPage";
import VerifyOTPPage from "./page/VerifyOTPPage";
import CreatePasswordPage from "./page/CreatePasswordPage";
import ProfilePage from "./page/ProfilePage";
import PendingPage from "./page/PendingPage";
import InProgressPage from "./page/InProgressPage";
import DonePage from "./page/DonePage";
import CancelledPage from "./page/CancelledPage";

function App() {
  const loggedIn = getToken();

  if (loggedIn) {
    return (
      <Fragment>
        <Router>
          <AppNavbar />
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/task" element={<NewTaskPage />} />
            <Route path="/allTask" element={<TaskListPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/pending" element={<PendingPage />} />
            <Route path="/inProgress" element={<InProgressPage />} />
            <Route path="/done" element={<DonePage />} />
            <Route path="/cancelled" element={<CancelledPage />} />
            <Route path="/verifyOTP" element={<VerifyOTPPage />} />
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
            <Route path="*" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/sendOTP" element={<SendOTPPage />} />
            <Route path="/verifyOTP" element={<VerifyOTPPage />} />
            <Route path="/createPassword" element={<CreatePasswordPage />} />
          </Routes>
        </Router>
      </Fragment>
    );
  }
}

export default App;
