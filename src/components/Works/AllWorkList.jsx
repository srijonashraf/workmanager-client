import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Modal } from "react-bootstrap";
import {
  AllWork,
  DeleteWork,
  UpdateWorkStatus,
  UpdateWorkData,
} from "../apiRequest/apiRequest";
import { errorToast, successToast } from "../helper/ToasterHelper";
import { Toaster } from "react-hot-toast";
import ReactQuill from "react-quill";
import QuillToolbar from "../utility/ReactQuillModules";

const AllWorkList = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedWorkId, setSelectedWorkId] = useState(null);
  const [selectedWorkIdForUpdate, setSelectedWorkIdForUpdate] = useState(null);
  const [selectedWorkStatus, setSelectedWorkStatus] = useState("Done");
  const [showEditModal, setShowEditModal] = useState(false);
  const [change, setChange] = useState(0);
  const [editableFields, setEditableFields] = useState({
    workTitle: "",
    workDescription: "",
  });

  useEffect(() => {
    (async () => {
      FetchAllWorks();
    })();
  }, [change]);

  //Fetch all the works
  const FetchAllWorks = async () => {
    try {
      setLoading(true);
      const response = await AllWork();

      if (response && response.data && response.status === 200) {
        setWorks(response.data.data);
      } else {
        console.error("Invalid response format:", response);
        setWorks([]);
      }
    } catch (error) {
      console.error("Failed to fetch works", error);
      setWorks([]);
    } finally {
      setLoading(false);
    }
  };

  //Delete work using id
  const DeleteWorkRequest = async (id) => {
    try {
      const response = await DeleteWork(id);
      if (response) {
        successToast("Work deleted successfully");
        setChange(new Date().getTime());
      } else {
        errorToast("Failed to delete work");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //Update work status
  const HandleUpdateStatus = () => {
    if (selectedWorkId) {
      UpdateWorkStatusRequest(selectedWorkId, selectedWorkStatus);
      setShowStatusModal(false);
    }
  };

  const UpdateWorkStatusRequest = async (workId, status) => {
    try {
      const response = await UpdateWorkStatus(workId, status);
      if (response) {
        successToast("Work status updated");
        setChange(new Date().getTime());
      } else {
        errorToast("Failed to update");
      }
    } catch (err) {
      console.error(err);
    }
  };

  //Edit Work

  const HandleUpdateWork = () => {
    if (selectedWorkIdForUpdate) {
      UpdateWorkRequest(selectedWorkIdForUpdate, editableFields);
      setShowEditModal(false);
    }
  };

  const UpdateWorkRequest = async (selectedWorkIdForUpdate, editableFields) => {
    try {
      const response = await UpdateWorkData(
          selectedWorkIdForUpdate,
          editableFields
      );
      if (response) {
        successToast("Work updated successfully");
        setChange(new Date().getTime());
      } else {
        errorToast("Failed to update work");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
      <Container className="mt-3">
        <Toaster position="top-right"></Toaster>
        <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
          {loading ? (
              <Col className="mb-3">
                <p>Loading...</p>
              </Col>
          ) : works.length === 0 ? (
              <Col className="mb-3">
                <h4 className="animated flash">No work here!</h4>
              </Col>
          ) : (
              works.map((work) => (
                  <Col key={work._id} className="mb-3">
                    <Card className="h-100 shadow border-0 d-flex flex-column">
                      <Card.Body className="d-flex flex-column">
                        <h5>{work.workTitle}</h5>
                        <div
                            dangerouslySetInnerHTML={{ __html: work.workDescription }}
                        />
                        <Card.Footer className="mt-auto border-top">
                          {(() => {
                            let variant = "";
                            if (work.workStatus === "Done") {
                              variant = "success";
                            } else if (work.workStatus === "In Progress") {
                              variant = "warning";
                            } else if (work.workStatus === "Cancelled") {
                              variant = "danger";
                            } else {
                              variant = "primary";
                            }

                            return (
                                <>
                                  <Button
                                      variant={variant}
                                      className="text-white rounded-1 btn-sm me-2"
                                      onClick={() => {
                                        setShowStatusModal(true);
                                        setSelectedWorkId(work._id);
                                      }}
                                  >
                                    {work.workStatus}
                                  </Button>

                                  {/* Update Work Status Modal */}
                                  <Modal
                                      show={showStatusModal}
                                      onHide={() => setShowStatusModal(false)}
                                  >
                                    <Modal.Header closeButton>
                                      <Modal.Title>Update Work Status</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                      <p>Select the new status for the work:</p>
                                      <select
                                          className="form-select"
                                          onChange={(e) =>
                                              setSelectedWorkStatus(e.target.value)
                                          }
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
                                          onClick={() => setShowStatusModal(false)}
                                      >
                                        Close
                                      </Button>
                                      <Button
                                          variant="primary"
                                          onClick={HandleUpdateStatus}
                                      >
                                        Save Changes
                                      </Button>
                                    </Modal.Footer>
                                  </Modal>
                                </>
                            );
                          })()}

                          <Button
                              className="btn-sm rounded-1 btn-dark me-2"
                              onClick={() => {
                                const workDetails = works.find(
                                    (w) => w._id === work._id
                                );

                                if (workDetails) {
                                  setEditableFields({
                                    workTitle: workDetails.workTitle,
                                    workDescription: workDetails.workDescription,
                                  });
                                  setShowEditModal(true);
                                  setSelectedWorkIdForUpdate(work._id);
                                }
                              }}
                          >
                            Edit
                          </Button>
                          <Button
                              onClick={() => DeleteWorkRequest(work._id)}
                              className="btn-sm rounded-1 btn-danger"
                          >
                            Delete
                          </Button>
                          <p className="text-muted sm-text float-end mt-2">
                            Edited: {new Date(work.updatedAt).toLocaleString()}
                          </p>
                        </Card.Footer>
                      </Card.Body>
                    </Card>
                  </Col>
              ))
          )}
        </Row>

        {/* Edit Work Modal */}
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
                modules={{
                  toolbar: QuillToolbar,
                }}
                value={editableFields.workDescription}
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
      </Container>
  );
};

export default AllWorkList;
