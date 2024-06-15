import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import AppNavbar from "./components/Shared/AppNavbar.jsx";
import { getToken } from "./helper/SessionHelper.js";
import Error from "./components/Shared/404.jsx";
import RegistrationPage from "./page/RegistrationPage.jsx";
import WorkListPage from "./page/WorkListPage.jsx";
import DashboardPage from "./page/DashboardPage.jsx";
import SendOTPPage from "./page/SendOTPPage";
import VerifyOTPPage from "./page/VerifyOTPPage";
import CreatePasswordPage from "./page/CreatePasswordPage";
import ProfilePage from "./page/ProfilePage";
import OtpContextProvider from "./context/OtpContextProvider.jsx";
import ProtectedVerifyOtp from "./components/ProtectedRoute/ProtectedVerifyOtp.jsx";
import ProtectedCreatePassword from "./components/ProtectedRoute/ProtectedCreatePassword.jsx";
import { Toaster } from "react-hot-toast";
import WorkByStatusPage from "./page/WorkByStatusPage.jsx";
import CreateWorkPage from "./page/CreateWorkPage";
import ModalContextProvider from "./context/ModalContextProvider.jsx";

function App() {
  const loggedIn = getToken();

  if (loggedIn) {
    return (
      <Fragment>
        <Toaster position="bottom-center" />
        <Router>
          <ModalContextProvider>
            <AppNavbar />
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/createWork" element={<CreateWorkPage />} />
              <Route path="/allWork" element={<WorkListPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route
                path="/workByStatus/:status"
                element={<WorkByStatusPage />}
              />
              <Route
                path="/sendOTP/:email"
                element={
                  <OtpContextProvider>
                    <SendOTPPage />
                  </OtpContextProvider>
                }
              />
              <Route
                path="/verifyOTP/from_profile"
                element={
                  <OtpContextProvider>
                    <ProtectedVerifyOtp>
                      <VerifyOTPPage />
                    </ProtectedVerifyOtp>
                  </OtpContextProvider>
                }
              />
              <Route path="*" element={<Error />} />
            </Routes>
          </ModalContextProvider>
        </Router>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Toaster position="bottom-center" />
        <Router>
          <Routes>
            <Route path="*" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route
              path="/sendOTP"
              element={
                <OtpContextProvider>
                  <SendOTPPage />
                </OtpContextProvider>
              }
            />
            <Route
              path="/verifyOTP/from_forget_password"
              element={
                <OtpContextProvider>
                  <ProtectedVerifyOtp>
                    <VerifyOTPPage />
                  </ProtectedVerifyOtp>
                </OtpContextProvider>
              }
            />
            <Route
              path="/createPassword"
              element={
                <OtpContextProvider>
                  <ProtectedCreatePassword>
                    <CreatePasswordPage />
                  </ProtectedCreatePassword>
                </OtpContextProvider>
              }
            />
          </Routes>
        </Router>
      </Fragment>
    );
  }
}

export default App;
