import React, { useContext, useEffect, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import ModelContext from "../../context/ModalContext";
import ReactQuill from "react-quill";
import parse from "html-react-parser";
import QuillToolbar from "../../utility/ReactQuillModules";
import { MAX_LENGTH } from "../../constants/ReactQuillMaxLength";

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

  const quillRef = useRef(null);

  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      const handleTextChange = () => {
        const plainText = quill.getText().trim();
        if (plainText.length > MAX_LENGTH) {
          quill.deleteText(MAX_LENGTH, quill.getLength());
        }
      };

      quill.on("text-change", handleTextChange);
      return () => {
        quill.off("text-change", handleTextChange);
      };
    }
  }, [editableFields]);

  const renderModalBody = () => {
    switch (type) {
      case "status":
        return (
          <>
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
              <Button
                variant="secondary"
                className="btn-sm"
                onClick={() => setShowStatusModal(false)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                className="btn-sm"
                onClick={HandleUpdateStatus}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </>
        );
      case "edit":
        return (
          <>
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
                ref={quillRef}
                theme="snow"
                value={editableFields.workDescription}
                modules={{ toolbar: QuillToolbar }}
                onChange={(content, delta, source, editor) =>
                  setEditableFields((prevFields) => ({
                    ...prevFields,
                    workDescription: editor.getHTML(),
                  }))
                }
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                className="btn-sm"
                onClick={() => setShowEditModal(false)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                className="btn-sm"
                onClick={HandleUpdateWork}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </>
        );
      case "details":
        return (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{workTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-content">
              {parse(workDescription)}
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
              <div className="text-muted sm-text">
                {lastEdited && (
                  <>
                    <span>Edited: </span>
                    <span>
                      {new Date(lastEdited).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                      })}
                    </span>
                  </>
                )}
              </div>
              <Button
                variant="secondary"
                className="btn-sm"
                onClick={() => setShowOpenModal(false)}
              >
                Close
              </Button>
            </Modal.Footer>
          </>
        );
      default:
        return null;
    }
  };

  const showModal =
    type === "status"
      ? showStatusModal
      : type === "edit"
      ? showEditModal
      : showOpenModal;
  const setShowModal =
    type === "status"
      ? setShowStatusModal
      : type === "edit"
      ? setShowEditModal
      : setShowOpenModal;

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      {renderModalBody()}
    </Modal>
  );
};

export default ModalComponent;
