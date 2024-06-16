import React, { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import ModelContext from "../../context/ModalContext.js";
import ReactQuill from "react-quill";
import parse from "html-react-parser";
import QuillToolbar from "../../utility/ReactQuillModules.js";

const ModalComponent = ({ type, workTitle, workDescription, lastEdited }) => {
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
    showOpenModal,
    setShowOpenModal,
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
  } else if (type === "details") {
    return (
      <Modal show={showOpenModal} onHide={() => setShowOpenModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{workTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-content">
          {parse(workDescription)}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <div className="text-muted sm-text">
            {lastEdited ? (
              <>
                <span>Edited: </span>
                <span>
                  {new Date(lastEdited).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                  })}
                </span>
              </>
            ) : null}
          </div>
          <Button variant="secondary" onClick={() => setShowOpenModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return null;
};

export default ModalComponent;
