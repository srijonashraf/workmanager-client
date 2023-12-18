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

export { UserLoginRequest }; // Correct export statement
