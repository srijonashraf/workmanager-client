import axios from "axios";
import { clearSessions } from "./SessionHelper.js";
import Cookies from "js-cookie";
import { SessionAlertSwal } from "./ToasterHelper.js";

export const getBaseURL = () => {
  if (process.env.NODE_ENV === "production") {
    return import.meta.env.VITE_BASE_URL;
  } else {
    return import.meta.env.VITE_BASE_URL_LOCAL;
  }
};

export const axiosHeader = () => {
  return {
    headers: { token: Cookies.get("token") },
  };
};

export const LogoutWhenSessionExpired = () => {
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      if (error.response && error.response.status === 401) {
        const isConfirmed = await SessionAlertSwal();
        if (isConfirmed) {
          clearSessions();
        }
      }
      return Promise.reject(error);
    }
  );
};
