import React, { useState, useCallback } from "react";
import ModelContext from "./ModalContext.js";
import {
  UpdateWorkStatus,
  UpdateWorkData,
  DeleteWork,
} from "../apiRequest/apiRequest.js";
import { successToast } from "../helper/ToasterHelper.js";

const ModalContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedWorkId, setSelectedWorkId] = useState(null);
  const [selectedWorkIdForUpdate, setSelectedWorkIdForUpdate] = useState(null);
  const [selectedWorkStatus, setSelectedWorkStatus] = useState("Done");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editableFields, setEditableFields] = useState({
    workTitle: "",
    workDescription: "",
  });
  const [change, setChange] = useState(0);
  const [showOpenModal, setShowOpenModal] = useState(false);

  const HandleUpdateStatus = useCallback(() => {
    if (selectedWorkId) {
      UpdateWorkStatusRequest(selectedWorkId, selectedWorkStatus);
      setShowStatusModal(false);
    }
  }, [selectedWorkId, selectedWorkStatus]);

  const UpdateWorkStatusRequest = async (workId, status) => {
    try {
      const response = await UpdateWorkStatus(workId, status);
      if (response) {
        successToast("Work status updated");
        setChange(Date.now());
      } else {
        errorToast("Failed to update status");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const HandleUpdateWork = useCallback(() => {
    if (selectedWorkIdForUpdate) {
      UpdateWorkRequest(selectedWorkIdForUpdate, editableFields);
      setShowEditModal(false);
    }
  }, [selectedWorkIdForUpdate, editableFields]);

  const UpdateWorkRequest = async (workId, fields) => {
    try {
      const response = await UpdateWorkData(workId, fields);
      if (response) {
        successToast("Work updated successfully");
        setChange(Date.now());
      } else {
        errorToast("Failed to update work");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const DeleteWorkRequest = async (id) => {
    try {
      const response = await DeleteWork(id);
      if (response) {
        successToast("Work deleted successfully");
        setChange(Date.now());
      } else {
        errorToast("Failed to delete work");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ModelContext.Provider
      value={{
        loading,
        change,
        setLoading,
        showStatusModal,
        setShowStatusModal,
        selectedWorkId,
        setSelectedWorkId,
        selectedWorkIdForUpdate,
        setSelectedWorkIdForUpdate,
        selectedWorkStatus,
        setSelectedWorkStatus,
        showEditModal,
        setShowEditModal,
        editableFields,
        setEditableFields,
        HandleUpdateStatus,
        HandleUpdateWork,
        DeleteWorkRequest,
        showOpenModal,
        setShowOpenModal,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export default ModalContextProvider;
