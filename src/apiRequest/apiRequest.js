import axios from "axios";
import { useCookies } from "react-cookie";
import { setToken, setLoggedIn, isLoggedIn } from "../helper/SessionHelper";
const BASE_URL = "https://workmanager-srijonashraf.vercel.app/api/v1";

function UserLoginRequest(email, password) {
  let URL = BASE_URL + "/login";
  let PostBody = { email: email, password: password };
  return axios
    .post(URL, PostBody)
    .then((res) => {
      if (res.data.status === "success") {
        setToken(res.data.token);
        setLoggedIn(true);
        console.log(isLoggedIn());
        return true;
      } else {
        setLoggedIn(false);
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

function UserRegistrationRequest(formValues) {
  let URL = BASE_URL + "/registration";
  let PostBody = {
    employeeId: formValues.employeeId,
    email: formValues.email,
    firstName: formValues.firstName,
    lastName: formValues.lastName,
    mobile: formValues.mobile,
    password: formValues.password,
    address: formValues.address,
    position: formValues.position,
    department: formValues.department,
  };

  return axios
    .post(URL, PostBody)
    .then((res) => {
      if (res.data.status === "success") {
        console.log("Registration Successful");
        return true;
      } else {
        console.log("Registration Failed");
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

export { UserLoginRequest, UserRegistrationRequest };
