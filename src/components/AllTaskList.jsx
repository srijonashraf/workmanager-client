import React, {useEffect, useState} from "react";
import {Container, Card, Row, Col, Button, Modal} from "react-bootstrap";
import {
    AllTask,
    DeleteTask,
    UpdateTaskStatus,
    UpdateTaskData,
} from "../apiRequest/apiRequest";
import {errorToast, successToast} from "../helper/ToasterHelper";
import {Toaster} from "react-hot-toast";
import ReactQuill from "react-quill";

const AllTaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [selectedTaskIdForUpdate, setSelectedTaskIdForUpdate] = useState(null);
    const [selectedTaskStatus, setSelectedTaskStatus] = useState("Done");
    const [showEditModal, setShowEditModal] = useState(false);
    const [change, setChange] = useState(0);
    const [editableFields, setEditableFields] = useState({
        workTitle: "",
        workDescription: "",
    });

    useEffect(() => {
        (async () => {
            FetchAllTasks();
        })();
    }, [change]);


    //Fetch all the tasks
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

    //Delete task using id
    const DeleteTaskRequest = async (id) => {
        try {
            const response = await DeleteTask(id);
            if (response) {
                successToast("Task deleted successfully");
                setChange(new Date().getTime());
            } else {
                errorToast("Failed to delete task");
            }
        } catch (err) {
            console.log(err);
        }
    };

    //Update task status
    const HandleUpdateStatus = () => {
        if (selectedTaskId) {
            UpdateTaskStatusRequest(selectedTaskId, selectedTaskStatus);
            setShowStatusModal(false);
        }
    };

    const UpdateTaskStatusRequest = async (taskId, status) => {
        try {
            const response = await UpdateTaskStatus(taskId, status);
            if (response) {
                successToast("Task status updated");
                setChange(new Date().getTime());
            } else {
                errorToast("Failed to update");
            }
        } catch (err) {
            console.error(err);
        }
    };

//Edit Task

    const HandleUpdateTask = () => {
        if (selectedTaskIdForUpdate) {
            UpdateTaskRequest(selectedTaskIdForUpdate, editableFields);
            setShowEditModal(false);
        }
    };

    const UpdateTaskRequest = async (selectedTaskIdForUpdate, editableFields) => {
        try {
            const response = await UpdateTaskData(
                selectedTaskIdForUpdate,
                editableFields
            );
            if (response) {
                successToast("Task updated successfully");
                setChange(new Date().getTime());
            } else {
                errorToast("Failed to update task");
            }
        } catch (err) {
            console.log(err);
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
                ) : tasks.length === 0 ? (
                    <Col className="mb-3">
                        <h4 className="animated flash">No task here!</h4>
                    </Col>
                ) : (
                    tasks.map((task) => (
                        <Col key={task._id} className="mb-3">
                            <Card className="h-100 shadow border-0 d-flex flex-column">
                                <Card.Body className="d-flex flex-column">
                                    <h5>{task.workTitle}</h5>
                                    <div dangerouslySetInnerHTML={{__html: task.workDescription}}/>
                                    <Card.Footer className="mt-auto border-top">
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
                                                            setShowStatusModal(true);
                                                            setSelectedTaskId(task._id);
                                                        }}
                                                    >
                                                        {task.workStatus}
                                                    </Button>

                                                    {/* Update Task Status Modal */}
                                                    <Modal
                                                        show={showStatusModal}
                                                        onHide={() => setShowStatusModal(false)}
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
                                                const taskDetails = tasks.find(
                                                    (t) => t._id === task._id
                                                );

                                                if (taskDetails) {
                                                    setEditableFields({
                                                        workTitle: taskDetails.workTitle,
                                                        workDescription: taskDetails.workDescription,
                                                    });
                                                    setShowEditModal(true);
                                                    setSelectedTaskIdForUpdate(task._id);
                                                }
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => DeleteTaskRequest(task._id)}
                                            className="btn-sm rounded-1 btn-danger"
                                        >
                                            Delete
                                        </Button>
                                        <p className="text-muted sm-text float-end mt-2">
                                            Edited: {new Date(task.updatedAt).toLocaleString()}
                                        </p>
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>

            {/* Edit Task Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Title:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={editableFields.workTitle}
                        onChange={(e) => setEditableFields((prevFields) => ({
                            ...prevFields,
                            workTitle: e.target.value,
                        }))}
                    />

                    <label className="mt-3">Description:</label>
                    <ReactQuill
                        theme="snow"
                        modules={{
                            toolbar: QuillToolbar,
                          }}
                        value={editableFields.workDescription}
                        onChange={(value) => setEditableFields((prevFields) => ({
                            ...prevFields,
                            workDescription: value,
                        }))}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={HandleUpdateTask}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default AllTaskList;
