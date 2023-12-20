import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Modal } from "react-bootstrap";
import {
  AllTask,
  DeleteTask,
  UpdateTaskStatus,
} from "../apiRequest/apiRequest";
import { errorToast, successToast } from "../helper/ToasterHelper";
import { Toaster } from "react-hot-toast";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedTaskStatus, setSelectedTaskStatus] = useState("Done"); // Set the initial status here

  useEffect(() => {
    FetchAllTasks();
  }, []);

  const DeleteTaskRequest = async (id) => {
    try {
      const response = await DeleteTask(id);
      if (response) {
        successToast("Task deleted successfully");
        FetchAllTasks();
      } else {
        errorToast("Failed to delete task");
      }
    } catch (err) {
      console.log("Failed to reach server");
    }
  };

  const UpdateTaskStatusRequest = async (taskId, status) => {
    try {
      const response = await UpdateTaskStatus(taskId, status);
      if (response) {
        successToast("Task status updated");
        FetchAllTasks();
      } else {
        errorToast("Failed to update");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const FetchAllTasks = async () => {
    try {
      setLoading(true);
      const response = await AllTask();

      if (response && response.data && response.status === 200) {
        setTasks(response.data.data);
      } else {
        console.error("Invalid response format:", response);
        setTasks([]);
      }
    } catch (error) {
      console.error("Failed to fetch tasks", error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = () => {
    if (selectedTaskId) {
      UpdateTaskStatusRequest(selectedTaskId, selectedTaskStatus);
      setShowModal(false);
    }
  };

  return (
    <Container fluid className="mt-3">
      <Toaster position="top-right"></Toaster>
      <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
        {loading ? (
          <Col className="mb-3">
            <p>Loading...</p>
          </Col>
        ) : (
          tasks.map((task) => (
            <Col key={task._id} className="mb-3">
              <Card className="h-100 shadow border-0 d-flex flex-column">
                <Card.Body className="d-flex flex-column animated fadeInUp">
                  <h5>{task.workTitle}</h5>
                  <p>{task.workDescription}</p>
                  <Card.Footer className="mt-auto border-top animated fadeInRight">
                    {(() => {
                      let variant = "";
                      if (task.workStatus === "Done") {
                        variant = "success";
                      } else if (task.workStatus === "In Progress") {
                        variant = "warning";
                      } else if (task.workStatus === "Cancelled") {
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
                              setShowModal(true);
                              setSelectedTaskId(task._id);
                            }}
                          >
                            {task.workStatus}
                          </Button>

                          {/* Modal for updating task status */}
                          <Modal
                            show={showModal}
                            onHide={() => setShowModal(false)}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Update Task Status</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <p>Select the new status for the task:</p>
                              <select
                                className="form-select"
                                onChange={(e) =>
                                  setSelectedTaskStatus(e.target.value)
                                }
                                value={selectedTaskStatus}
                              >
                                <option value="Done">Done</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="secondary"
                                onClick={() => setShowModal(false)}
                              >
                                Close
                              </Button>
                              <Button
                                variant="primary"
                                onClick={handleUpdateStatus}
                              >
                                Save Changes
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </>
                      );
                    })()}
                    {/* Edit Button is disabled TEMPORARY */}
                    <Button className="d-none btn-sm rounded-1 btn-dark me-2"> 
                      Edit
                    </Button>
                    <Button
                      onClick={() => DeleteTaskRequest(task._id)}
                      className="btn-sm rounded-1 btn-danger"
                    >
                      Delete
                    </Button>
                    <p className="text-muted sm-text float-end mt-2">
                      Edited: {task.updatedAt}
                    </p>
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default TaskList;
