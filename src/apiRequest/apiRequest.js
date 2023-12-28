import axios from "axios";
import { setToken, getToken, setUserEmail } from "../helper/SessionHelper";
import unauthorized from "./../utility/unauthorized";

const BASE_URL = "https://workmanager-srijonashraf.vercel.app/api/v1";
// const BASE_URL = "http://localhost:3000/api/v1";

function UserLogin(email, password) {
  const URL = BASE_URL + "/login";
  const postBody = { email, password };

  return axios
    .post(URL, postBody)
    .then((res) => {
      if (res.data.status === "success") {
        setToken(res.data.token);
        setUserEmail(email);
        console.log("Login Successful");
        return res;
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
  const URL = `${BASE_URL}/loginwithgoogle`;

  const postBody = {
    email: googleAuthValue.email,
    firstName: googleAuthValue.firstName,
    lastName: googleAuthValue.lastName,
  };

  return axios
    .post(URL, postBody)
    .then((res) => {
      if (res.data.status === "success") {
        const email = googleAuthValue.email; // assuming email is accessible here
        axios
          .get(`${BASE_URL}/verified/${email}`)
          .then((verificationRes) => {
            console.log(verificationRes);
          })
          .catch((verificationErr) => {
            console.error(verificationErr);
          });

        setToken(res.data.token);
        console.log("Google Sign-In Successful");
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

function UserRegistration(formValues) {
  const URL = BASE_URL + "/registration";
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
        console.log("Registration Successful");
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
  const URL = BASE_URL + "/createWork";
  const postBody = {
    workTitle: taskTitle,
    workDescription: taskDescription,
    workStatus: "Pending",
  };

  return axios
    .post(URL, postBody, { headers: { token: getToken() } })
    .then((res) => {
      if (res.data.status === "success") {
        console.log("Data Added.");
        return res;
      }
      if (res.status === 401) {
        unauthorized(401);
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
  const URL = BASE_URL + "/allWork";
  return axios
    .get(URL, { headers: { token: getToken() } })
    .then((res) => {
      if (res.data.status === "success") {
        console.log("Data fetched");
        return res;
      }
      if (res.status === 401) {
        unauthorized(401);
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
  const URL = BASE_URL + "/deleteWork/" + id;
  return axios
    .get(URL, { headers: { token: getToken() } })
    .then((res) => {
      if (res.data.status === "success") {
        console.log("Data deleted");
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
  const URL = BASE_URL + "/updateWorkStatus/" + id + "/" + status;
  return axios
    .get(URL, { headers: { token: getToken() } })
    .then((res) => {
      if (res.data.status === "success") {
        // console.log("Work status updated");
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
  const URL = BASE_URL + "/updateWork/" + id;
  return axios
    .post(URL, updatedFields, { headers: { token: getToken() } })
    .then((res) => {
      if (res.data.status === "success") {
        console.log("Work updated");
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
  const URL = BASE_URL + "/workStatusCount";
  return axios
    .get(URL, { headers: { token: getToken() } })
    .then((res) => {
      if (res.data.status === "success") {
        console.log("Work status Count Updated");
        return res;
      } else {
        console.log("Work status count didn't updated");
        return false;
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
      console.log("6 Digit Verification Code has been sent");
      return response;
    } else if (response.data.status === "fail") {
      console.log("User not found");
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
  const URL = `${BASE_URL}/listWorkByStatus/${workStatus}`;
  try {
    const response = await axios.get(URL, { headers: { token: getToken() } });

    if (response.data.status === "success") {
      console.log("API: Fetched data by status.");
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
  console.log(URL);
  try {
    const response = await axios.get(URL);
    if (response.data.status === "success") {
      console.log(response);
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
  const URL = BASE_URL + "/RecoverResetPass";
  const postBody = { email: email, OTP: otp, password: password };
  console.log(URL);
  try {
    const response = await axios.post(URL, postBody);
    if (response.data.status === "success") {
      console.log(response);
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
  const URL = `${BASE_URL}/profileDetails`;
  try {
    const response = await axios.get(URL, { headers: { token: getToken() } });
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
  const URL = `${BASE_URL}/profileUpdate`;
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
    const response = await axios.post(URL, PostBody, {
      headers: { token: getToken() },
    });
    if (response.data.status === "success") {
      // console.log(response);
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
  const URL = `${BASE_URL}/verified/${email}`;
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
};
