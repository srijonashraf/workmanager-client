import React, { useContext, useEffect, useState } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { AllWork, ShowWorkByStatus } from "../../apiRequest/apiRequest.js";
import { useParams } from "react-router-dom";
import ModalComponent from "./Modal";
import ModalContext from "../../context/ModalContext.js";
import parse from "html-react-parser";

const WorkByStatus = () => {
  const [works, setWorks] = useState([]);
  const [detailsView, setDetailsView] = useState({
    workTitle: "",
    workDescription: "",
  });
  const statusParam = useParams().status;

  const {
    loading,
    setLoading,
    setShowStatusModal,
    setSelectedWorkId,
    setSelectedWorkIdForUpdate,
    setShowEditModal,
    setEditableFields,
    DeleteWorkRequest,
    change,
    setShowOpenModal,
  } = useContext(ModalContext);

  // Function to fetch all works
  const fetchAllWorks = async (setWorks, setLoading) => {
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

  // Function to fetch works by status
  const fetchWorksByStatus = async (status, setWorks, setLoading) => {
    try {
      setLoading(true);
      const response = await ShowWorkByStatus(status);
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

  // Main useEffect hook
  useEffect(() => {
    if (!statusParam || statusParam === "allWork") {
      fetchAllWorks(setWorks, setLoading);
    } else {
      fetchWorksByStatus(statusParam, setWorks, setLoading);
    }
  }, [statusParam, change]);

  return (
    <Container className="mt-3">
      <Row className="row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {loading ? (
          <Col className="mb-3">
            <p>Loading...</p>
          </Col>
        ) : works.length > 0 ? (
          works.map((work) => (
            <Col key={work._id} className="mb-3 d-flex">
              <Card
                onClick={() => {
                  setShowOpenModal(true);
                  setDetailsView({
                    workTitle: work.workTitle,
                    workDescription: work.workDescription,
                  });
                }}
                className="shadow border-0 w-100 d-flex flex-column cursorPointer"
              >
                <Card.Body className="d-flex flex-column">
                  <h5 className="fw-bold">{work.workTitle}</h5>
                  <div className="md-text">
                    {parse(
                      work.workDescription.length > 200
                        ? work.workDescription.slice(0, 200) +
                            "<span>...</span>"
                        : work.workDescription
                    )}
                  </div>
                  <Card.Footer className="mt-auto border-top">
                    <Button
                      variant={
                        work.workStatus === "Done"
                          ? "success"
                          : work.workStatus === "In Progress"
                          ? "warning"
                          : work.workStatus === "Cancelled"
                          ? "danger"
                          : "primary"
                      }
                      className="text-white rounded-1 btn-sm me-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowStatusModal(true);
                        setSelectedWorkId(work._id);
                      }}
                    >
                      {work.workStatus}
                    </Button>

                    <Button
                      className="btn-sm rounded-1 btn-dark me-2"
                      onClick={(e) => {
                        e.stopPropagation();
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
                      onClick={(e) => {
                        e.stopPropagation();
                        DeleteWorkRequest(work._id);
                      }}
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
        ) : null}
        {!loading && works.length === 0 && (
          <Col className="mb-3">
            <h4 className="animated flash">No work here!</h4>
          </Col>
        )}
      </Row>
      <ModalComponent
        type="details"
        workTitle={detailsView.workTitle}
        workDescription={detailsView.workDescription}
      />
      <ModalComponent type="edit" />
      <ModalComponent type="status" />
    </Container>
  );
};

export default WorkByStatus;
