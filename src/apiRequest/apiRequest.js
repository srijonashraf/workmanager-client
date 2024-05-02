import axios from "axios";
import { getToken, setUserEmail } from "../helper/SessionHelper";
import Cookies from "js-cookie";

let BASE_URL = "http://localhost:3000/api/v1";

if (process.env.NODE_ENV === "production") {
  BASE_URL = import.meta.env.VITE_BASE_URL;
}

// Set token manually and clear them when logout api is called to work perfectly in netlify deployment, { withCredentials: true } will be substitute with header also there will be change in auth middleware token retrive variable in backend
function UserLogin(email, password) {
  const URL = `${BASE_URL}/UserLogin`;
  const postBody = { email, password };

  return axios
    .post(URL, postBody, { withCredentials: true })
    .then((res) => {
      if (res.data.status === "success") {
        // Cookies.set(res.data.token)
        setUserEmail(email);
        console.log("All Cookies", Cookies.get());
        console.log("Token from cookies:", Cookies.get("token"));
        return true;
      } else {
        console.log("Login Failed");
        return false;
      }
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}

function GoogleSignIn(googleAuthValue) {
  const URL = `${BASE_URL}/UserGoogleSignIn`;

  const postBody = {
    email: googleAuthValue.email,
    firstName: googleAuthValue.firstName,
    lastName: googleAuthValue.lastName,
  };

  return axios
    .post(URL, postBody, { withCredentials: true })
    .then((res) => {
      if (res.data.status === "success") {
        const email = googleAuthValue.email;
        axios
          .get(`${BASE_URL}/verified/${email}`)
          .then((verificationRes) => {
            console.log(verificationRes);
          })
          .catch((verificationErr) => {
            console.error(verificationErr);
          });

        // setToken(res.data.token);
        return res;
      } else {
        console.log("Google Sign-In Failed");
        return false;
      }
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}

function UserLogout() {
  const URL = `${BASE_URL}/UserLogout`;

  return axios
    .get(URL, { withCredentials: true })
    .then((res) => {
      if (res.data.status === "success") {
        // Cookies.set(res.data.token)
        return true;
      } else {
        console.log("Logout Failed");
        return false;
      }
    })
    .catch((err) => {
      console.error("Error during logout:", err);
      return false;
    });
}

function UserRegistration(formValues) {
  const URL = `${BASE_URL}/UserRegistration`;
  const postBody = {
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
    .post(URL, postBody)
    .then((res) => {
      if (res.data.status === "success") {
        return res;
      }
      if (res.data.status === "fail") {
        console.log("Registration Failed");
        return res;
      } else {
        console.log("Registration Failed");
        return false;
      }
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}

function AddNewTask(taskTitle, taskDescription) {
  const URL = `${BASE_URL}/WorkCreate`;
  const postBody = {
    workTitle: taskTitle,
    workDescription: taskDescription,
    workStatus: "Pending",
  };

  return axios
    .post(URL, postBody, { withCredentials: true })
    .then((res) => {
      if (res.data.status === "success") {
        return res;
      } else {
        console.log("Data Not Added.");
        return false;
      }
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}

function AllTask() {
  const URL = `${BASE_URL}/WorkAllList`;
  return axios
    .get(URL, { withCredentials: true })
    .then((res) => {
      if (res.data.status === "success") {
        return res;
      } else {
        console.log("Data didn't fetched");
        return false;
      }
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}

function DeleteTask(id) {
  const URL = `${BASE_URL}/WorkDelete/${id}`;
  return axios
    .get(URL, { withCredentials: true })
    .then((res) => {
      if (res.data.status === "success") {
        return res;
      } else {
        console.log("Data didn't deleted");
        return false;
      }
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}

function UpdateTaskStatus(id, status) {
  const URL = `${BASE_URL}/WorkStatusUpdate/${id}/${status}`;
  return axios
    .get(URL, { withCredentials: true })
    .then((res) => {
      if (res.data.status === "success") {
        return res;
      } else {
        console.log("Work status didn't updated");
        return false;
      }
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}

function UpdateTaskData(id, updatedFields) {
  const URL = `${BASE_URL}/WorkUpdate/${id}`;
  return axios
    .post(URL, updatedFields, { withCredentials: true })
    .then((res) => {
      if (res.data.status === "success") {
        return res;
      } else {
        console.log("Work didn't updated");
        return false;
      }
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}

function FetchTaskCount() {
  const URL = `${BASE_URL}/WorkStatusCountIndividual`;

  return axios
    .get(URL, { withCredentials: true })
    .then((res) => {
      if (res.data.status === "success") {
        return res;
      } else {
        console.log("Work status count didn't updated");
        return res;
      }
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}

async function RecoverVerifyEmail(email) {
  const URL = `${BASE_URL}/RecoverVerifyEmail/${email}`;

  try {
    const response = await axios.get(URL);

    if (response.data.status === "success") {
      return response;
    } else if (response.data.status === "fail") {
      return response;
    } else {
      console.log("Failed to send verification code");
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function ShowTaskByStatus(workStatus) {
  const URL = `${BASE_URL}/WorkListByStatus/${workStatus}`;
  try {
    const response = await axios.get(URL, { withCredentials: true });

    if (response.data.status === "success") {
      return response;
    } else {
      console.log("API: Failed to fetched data by status.");
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function VerifyOTP(value, email) {
  const URL = `${BASE_URL}/RecoverVerifyOTP/${email}/${value}`;

  try {
    const response = await axios.get(URL);
    if (response.data.status === "success") {
      return response;
    } else {
      console.log("OTP not matched");
      return response;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function RecoverPassword(email, otp, password) {
  const URL = `${BASE_URL}/RecoverResetPass`;
  const postBody = { email: email, OTP: otp, password: password };
  console.log(URL);
  try {
    const response = await axios.post(URL, postBody);
    if (response.data.status === "success") {
      return response;
    } else {
      console.log("Failed to reset password");
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function GetProfileDetails() {
  const URL = `${BASE_URL}/ProfileDetails`;
  try {
    const response = await axios.get(URL, { withCredentials: true });
    if (response.data.status === "success") {
      return response;
    } else {
      console.log("API: Profile Details failed to fetch");
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function ProfileUpdate(formValues) {
  const URL = `${BASE_URL}/ProfileUpdate`;
  const PostBody = {
    email: formValues.email,
    img: formValues.img,
    firstName: formValues.firstName,
    lastName: formValues.lastName,
    mobile: formValues.mobile,
    password: formValues.password,
    address: formValues.address,
    position: formValues.position,
    department: formValues.department,
  };

  try {
    const response = await axios.post(URL, PostBody, { withCredentials: true });
    if (response.data.status === "success") {
      return response;
    } else {
      console.log("Profile Details failed to update");
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function ProfileVerification(email) {
  const URL = `${BASE_URL}/ProfileVerification/${email}`;
  try {
    const response = await axios.get(URL);
    if (response.data.status === "success") {
      return response;
    } else {
      console.log("Profile verification failed");
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

export {
  UserLogin,
  UserRegistration,
  AddNewTask,
  AllTask,
  DeleteTask,
  UpdateTaskStatus,
  UpdateTaskData,
  FetchTaskCount,
  RecoverVerifyEmail,
  VerifyOTP,
  RecoverPassword,
  GetProfileDetails,
  ProfileUpdate,
  ShowTaskByStatus,
  GoogleSignIn,
  ProfileVerification,
  UserLogout,
};
