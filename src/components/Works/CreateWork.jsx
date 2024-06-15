import React, { useState } from "react";
import {
  Card,
  Container,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { AddNewWork } from "../apiRequest/apiRequest";
import { successToast, errorToast } from "../helper/ToasterHelper";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import QuillToolbar from "../utility/ReactQuillModules";

const CreateWork = () => {
  const [workTitle, setWorkTitle] = useState("");
  const [workDescription, setWorkDescription] = useState("");
  const [loading, setLoading] = useState(false); // Initialize loading as false
  const navigate = useNavigate();

  const handleAddWork = async () => {
    try {
      if (!workTitle || !workDescription) {
        errorToast("Please fill all the fields.");
        return;
      }

      setLoading(true); // Set loading to true when adding work
      const success = await AddNewWork(workTitle, workDescription);

      if (success) {
        successToast("New work added");

        setTimeout(() => {
          navigate("/allWork");
        }, 1000);
      } else {
        errorToast(
            "Failed to add new work. Check if the same work is already added!"
        );
      }
    } catch (error) {
      console.error(error);
      errorToast("An error occurred while adding the work");
    } finally {
      // Reset input fields after adding the work or handling the error
      setWorkTitle("");
      setWorkDescription("");
      setLoading(false); // Set loading back to false after completing the work addition
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
                    placeholder="Work Title"
                    value={workTitle}
                    onChange={(e) => setWorkTitle(e.target.value)}
                />
              </InputGroup>

              <ReactQuill
                  theme="snow"
                  placeholder="Work Description"
                  value={workDescription}
                  modules={{
                    toolbar: QuillToolbar,
                  }}
                  onChange={setWorkDescription}
              />
              {loading ? (
                  <Button disabled className="btn-disabled">
                    Work Adding...
                  </Button>
              ) : (
                  <Button onClick={handleAddWork}>Add Work</Button>
              )}
            </Card.Body>
          </Card>
        </Container>
      </>
  );
};

export default CreateWork;
