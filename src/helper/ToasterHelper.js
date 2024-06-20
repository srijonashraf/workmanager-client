import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

class ToasterClass {
  successToast(msg) {
    toast.success(msg);
  }
  errorToast(msg) {
    toast.error(msg);
  }

  async SessionAlertSwal() {
    const result = await Swal.fire({
      title: "Session Expired!",
      text: "Please login again to continue..",
      icon: "error",
      confirmButtonText: "Confirm",
      animation: false,
      allowOutsideClick: false,
      confirmButtonColor: "#000000",
    });
    return result.isConfirmed;
  }

  async DeleteAlertSwal() {
    const result = await Swal.fire({
      title: "Are you sure you want to delete?",
      text: "You can not revert the task..",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Delete",
      animation: false,
      allowOutsideClick: true,
      confirmButtonColor: "#C80036",
    });
    return result.isConfirmed;
  }
}

export const { errorToast, successToast, SessionAlertSwal, DeleteAlertSwal } =
  new ToasterClass();
