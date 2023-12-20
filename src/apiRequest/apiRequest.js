import axios from "axios";
import {
  setToken,
  getToken,
  setLoggedIn,
  isLoggedIn,
} from "../helper/SessionHelper";

const BASE_URL = "https://workmanager-srijonashraf.vercel.app/api/v1";

function UserLogin(email, password) {
  const URL = BASE_URL + "/login";
  const postBody = { email, password };

  return axios
    .post(URL, postBody)
    .then((res) => {
      if (res.data.status === "success") {
        setToken(res.data.token);
        setLoggedIn(true);
        console.log("Login Successful");
        return true;
      } else {
        setLoggedIn(false);
        console.log("Login Failed");
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
        return true;
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
        return true;
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
      return res; // Return the entire response object
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
      return res;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

function UpdateTaskStatus(id, status) {
  const URL = BASE_URL + "/updateWorkStatus/" + id + "/" + status;
  console.log(URL);
  return axios
    .get(URL, { headers: { token: getToken() } })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

const updateTaskData = async (id, updatedFields) => {
  try {
    const URL = BASE_URL + "/updateWork/" + id;
    console.log(URL);
    await axios.post(URL, updatedFields, { headers: { token: getToken() } });
    return true;
  } catch (error) {
    console.error("Failed to update task:", error);
    return false;
  }
};

export {
  UserLogin,
  UserRegistration,
  AddNewTask,
  AllTask,
  DeleteTask,
  UpdateTaskStatus,
  updateTaskData,
};
