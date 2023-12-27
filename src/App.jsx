import { Fragment } from "react";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import AppNavbar from "./components/AppNavbar";
import { getLoggedIn, getToken } from "./helper/SessionHelper.js";
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
import { GetProfileDetails } from "./apiRequest/apiRequest.js";

function App() {
  const loggedIn = getToken();
  const [show, setShow] = useState(false);
  const [profileDetails, setProfileDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetProfileDetails();
        setProfileDetails(res.data.data[0]);
        if (profileDetails.verified === false) {
          setShow(false);
        } else {
          setShow(true);
        }
      } catch (error) {
        console.log("Frontend: Error fetching data.");
        console.error(error);
      }
    };

    fetchData();
  }, [show]);

  if (loggedIn && show) {
    return (
      <Fragment>
        <Router>
          <AppNavbar />
          <Routes>
            <Route exact path="/task" element={<NewTaskPage />} />
            <Route exact path="/allTask" element={<TaskListPage />} />
            <Route exact path="/dashboard" element={<DashboardPage />} />
            <Route exact path="/" element={<DashboardPage />} />
            <Route exact path="/profile" element={<ProfilePage />} />
            <Route exact path="/pending" element={<PendingPage />} />
            <Route exact path="/inProgress" element={<InProgressPage />} />
            <Route exact path="/done" element={<DonePage />} />
            <Route exact path="/cancelled" element={<CancelledPage />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </Fragment>
    );
  } else if (loggedIn && !show) {
    return (
      <Fragment>
        <Router>
          {/* <AppNavbar /> */}
          <Routes>
            <Route exact path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<Error />} />
            <Route exact path="/" element={<DashboardPage />} />
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
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/register" element={<RegistrationPage />} />
            <Route exact path="/sendOTP" element={<SendOTPPage />} />
            <Route exact path="/verifyOTP" element={<VerifyOTPPage />} />
            <Route
              exact
              path="/createPassword"
              element={<CreatePasswordPage />}
            />
          </Routes>
        </Router>
      </Fragment>
    );
  }
}

export default App;
