import React, { useState } from "react";
import {
  Card,
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import { AddNewWork } from "../../apiRequest/apiRequest.js";
import { successToast, errorToast } from "../../helper/ToasterHelper.js";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import QuillToolbar from "../../utility/ReactQuillModules.js";
import "react-quill/dist/quill.snow.css";
import "../../assets/css/quillEditor.css";

const CreateWork = () => {
  const [workTitle, setWorkTitle] = useState("");
  const [workDescription, setWorkDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddWork = async () => {
    try {
      if (!workTitle || !workDescription) {
        errorToast("Please fill all the fields.");
        return;
      }

      setLoading(true);
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
      setWorkTitle("");
      setWorkDescription("");
      setLoading(false);
    }
  };

  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8} xl={8}>
          <Card className="w-100">
            <Card.Body className="d-flex flex-column gap-3">
              <Card.Title className="text-center">Create New</Card.Title>
              <InputGroup className="mb-2">
                <FormControl
                  type="text"
                  placeholder="Work Title"
                  value={workTitle}
                  onChange={(e) => setWorkTitle(e.target.value)}
                  className="py-2"
                />
              </InputGroup>

              <ReactQuill
                theme="snow"
                value={workDescription}
                modules={{ toolbar: QuillToolbar }}
                onChange={setWorkDescription}
              />

              <Button
                variant="primary"
                className="w-100"
                onClick={handleAddWork}
                disabled={loading}
              >
                {loading ? (
                  <Spinner as="span" animation="border" size="sm" />
                ) : (
                  "Add Work"
                )}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateWork;
