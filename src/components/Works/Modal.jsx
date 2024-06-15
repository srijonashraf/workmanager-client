import React, { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import ModelContext from "../../context/ModalContext.js";
import ReactQuill from "react-quill";
import QuillToolbar from "../../utility/ReactQuillModules.js";

const ModalComponent = ({ type }) => {
  const {
    showStatusModal,
    setShowStatusModal,
    showEditModal,
    setShowEditModal,
    selectedWorkStatus,
    setSelectedWorkStatus,
    HandleUpdateStatus,
    HandleUpdateWork,
    editableFields,
    setEditableFields,
  } = useContext(ModelContext);

  if (type === "status") {
    return (
      <Modal show={showStatusModal} onHide={() => setShowStatusModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Work Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Select the new status for the work:</p>
          <select
            className="form-select"
            onChange={(e) => setSelectedWorkStatus(e.target.value)}
            value={selectedWorkStatus}
          >
            <option value="Done">Done</option>
            <option value="In Progress">In Progress</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStatusModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={HandleUpdateStatus}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else if (type === "edit") {
    return (
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Work</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Title:</label>
          <input
            type="text"
            className="form-control"
            value={editableFields.workTitle}
            onChange={(e) =>
              setEditableFields((prevFields) => ({
                ...prevFields,
                workTitle: e.target.value,
              }))
            }
          />
          <label className="mt-3">Description:</label>
          <ReactQuill
            theme="snow"
            value={editableFields.workDescription}
            modules={{ toolbar: QuillToolbar }}
            onChange={(value) =>
              setEditableFields((prevFields) => ({
                ...prevFields,
                workDescription: value,
              }))
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={HandleUpdateWork}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return null;
};

export default ModalComponent;
