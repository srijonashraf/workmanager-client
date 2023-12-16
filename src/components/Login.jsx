import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { UserLoginRequest } from "../apiRequest/apiRequest.js";
import { useNavigate } from "react-router-dom";
import SubmitButton from "./SubmitButton.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnLoader, setBtnLoader] = useState(false);
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    if (email.length === 0 || password.length === 0) {
      toast.error("Email and Password are required!");
    } else {
      setBtnLoader(true);

      try {
        const res = await UserLoginRequest(email, password);
        setBtnLoader(false);

        if (res.status === "success") {
          toast.success("Login successful");
          navigate("/dashboard"); // Redirect to your dashboard or desired route
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        // Handle API request error
        toast.error("Failed to connect to the server");
        setBtnLoader(false);
      }
    }
  };

  return (
    <div className="container section">
      <div className="row d-flex justify-content-center">
        <div className="col-md-5">
          <div className="card h-100 ">
            <div className="card-body">
              <form>
                <label className="form-label my-2">Your Email Address</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control"
                />

                <label className="form-label my-2">Your Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control"
                />

                <SubmitButton
                  submit={btnLoader}
                  text="Login"
                  onClick={loginUser}
                  className="btn my-3 btn-primary w-100"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster position={"bottom-center"} />
    </div>
  );
};

export default Login;
