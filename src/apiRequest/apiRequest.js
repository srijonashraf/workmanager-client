import axios from "axios";
import Cookies from "js-cookie";
import {
  logoutWhenSessionExpired,
  axiosHeader,
  getBaseURL,
} from "../helper/FunctionHelper";

let BASE_URL = getBaseURL();

logoutWhenSessionExpired();

function UserLogin(email, password) {
  const URL = `${BASE_URL}/UserLogin`;
  const postBody = { email, password };

  return axios
    .post(URL, postBody, axiosHeader())
    .then((res) => {
      if (res.data.status === "success") {
        Cookies.set("token", res.data.token);
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
    .post(URL, postBody, axiosHeader())
    .then((res) => {
      if (res.data.status === "success") {
        Cookies.set("token", res.data.token);
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

function AddNewWork(workTitle, workDescription) {
  const URL = `${BASE_URL}/WorkCreate`;
  const postBody = {
    workTitle,
    workDescription,
    workStatus: "Pending",
  };

  return axios
    .post(URL, postBody, axiosHeader())
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

function AllWork() {
  const URL = `${BASE_URL}/WorkAllList`;
  return axios
    .get(URL, axiosHeader())
    .then((res) => {
      if (res.data.status === "success") {
        return res;
      } else {
        console.log("Data didn't fetch");
        return false;
      }
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}

function DeleteWork(id) {
  const URL = `${BASE_URL}/WorkDelete/${id}`;
  return axios
    .get(URL, axiosHeader())
    .then((res) => {
      if (res.data.status === "success") {
        return res;
      } else {
        console.log("Data didn't delete");
        return false;
      }
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}

function UpdateWorkStatus(id, status) {
  const URL = `${BASE_URL}/WorkStatusUpdate/${id}/${status}`;
  return axios
    .get(URL, axiosHeader())
    .then((res) => {
      if (res.data.status === "success") {
        return res;
      } else {
        console.log("Work status didn't update");
        return false;
      }
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}

function UpdateWorkData(id, updatedFields) {
  const URL = `${BASE_URL}/WorkUpdate/${id}`;
  return axios
    .post(URL, updatedFields, axiosHeader())
    .then((res) => {
      if (res.data.status === "success") {
        return res;
      } else {
        console.log("Work didn't update");
        return false;
      }
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}

function FetchWorkCount() {
  const URL = `${BASE_URL}/WorkStatusCountIndividual`;

  return axios
    .get(URL, axiosHeader())
    .then((res) => {
      if (res.data.status === "success") {
        return res;
      } else {
        console.log("Work status count didn't update");
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

async function ShowWorkByStatus(workStatus) {
  const URL = `${BASE_URL}/WorkListByStatus/${workStatus}`;
  try {
    const response = await axios.get(URL, axiosHeader());

    if (response.data.status === "success") {
      return response;
    } else {
      console.log("API: Failed to fetch data by status.");
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
  const postBody = { email, OTP: otp, password };
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
    const response = await axios.get(URL, axiosHeader());
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
  const postBody = {
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
    const response = await axios.post(URL, postBody, axiosHeader());
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

async function WorkSearchList(query) {
  const URL = `${BASE_URL}/WorkSearch/?q=${query}`;
  try {
    const response = await axios.get(URL, axiosHeader());
    if (response.data.status === "success") {
      return response;
    } else {
      console.log("Profile verification failed");
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

export {
  UserLogin,
  UserRegistration,
  AddNewWork,
  AllWork,
  DeleteWork,
  UpdateWorkStatus,
  UpdateWorkData,
  FetchWorkCount,
  RecoverVerifyEmail,
  VerifyOTP,
  RecoverPassword,
  GetProfileDetails,
  ProfileUpdate,
  ShowWorkByStatus,
  GoogleSignIn,
  ProfileVerification,
  WorkSearchList,
};
