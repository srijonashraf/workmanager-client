import React, { useState } from "react";
import {
  Card,
  Container,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { AddNewTask } from "../apiRequest/apiRequest";
import { successToast, errorToast } from "../helper/ToasterHelper";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import QuillToolbar from "../utility/ReactQuillModules";

const CreateTask = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [loading, setLoading] = useState(false); // Initialize loading as false
  const navigate = useNavigate();
  const handleAddTask = async () => {
    try {
      if (!taskTitle || !taskDescription) {
        errorToast("Please fill all the field.");
        return;
      }

      setLoading(true); // Set loading to true when adding task
      const success = await AddNewTask(taskTitle, taskDescription);

      if (success) {
        successToast("New task added");

        setTimeout(() => {
          navigate("/allTask");
        }, 1000);
      } else {
        errorToast(
          "Failed to add a new task. Check if the same task already added!"
        );
      }
    } catch (error) {
      console.error(error);
      errorToast("An error occurred while adding the task");
    } finally {
      // Reset input fields after adding the task or handling the error
      setTaskTitle("");
      setTaskDescription("");
      setLoading(false); // Set loading back to false after completing the task addition
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <Container className="mt-3">
        <Card>
          <Card.Body className="d-flex flex-column gap-4">
            <Card.Title>Create New</Card.Title>
            <InputGroup className="mb-3">
              <FormControl
                type="text"
                placeholder="Task Title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </InputGroup>

            <ReactQuill
              theme="snow"
              placeholder="Task Description"
              value={taskDescription}
              modules={{
                toolbar: QuillToolbar,
              }}
              onChange={setTaskDescription}
            />
            {loading ? (
              <Button disabled className="btn-disabled">
                Task Adding...
              </Button>
            ) : (
              <Button onClick={handleAddTask}>Add Task</Button>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default CreateTask;
