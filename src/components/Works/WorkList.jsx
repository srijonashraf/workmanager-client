import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { AllWork, ShowWorkByStatus } from "../../apiRequest/apiRequest.js";
import { useParams } from "react-router-dom";
import ModalComponent from "./Modal.jsx";
import ModalContext from "../../context/ModalContext.js";
import parse from "html-react-parser";
import "../../assets/css/workList.css";

const WorkList = () => {
  const [works, setWorks] = useState([]);
  const [detailsView, setDetailsView] = useState({
    workTitle: "",
    workDescription: "",
    lastEdited: "",
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
            <Col key={work._id}>
              <Card
                onClick={() => {
                  setShowOpenModal(true);
                  setDetailsView({
                    workTitle: work.workTitle,
                    workDescription: work.workDescription,
                    lastEdited: work.updatedAt || null,
                  });
                }}
                className="shadow border-0 w-100 card-hover"
              >
                <Card.Header className="bg-white text-dark">
                  <Card.Title>{work.workTitle}</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <div className="md-text mb-1 text-dark">
                      {parse(
                        work.workDescription.length > 200
                          ? work.workDescription.slice(0, 200) + "..."
                          : work.workDescription
                      )}
                    </div>
                  </Card.Text>

                  <ButtonGroup className="w-50">
                    <Button
                      variant={
                        work.workStatus === "Done"
                          ? "success"
                          : work.workStatus === "In Progress"
                          ? "info"
                          : work.workStatus === "Cancelled"
                          ? "secondary"
                          : "primary"
                      }
                      className="text-white rounded-pill badge me-2 badge-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowStatusModal(true);
                        setSelectedWorkId(work._id);
                      }}
                    >
                      {work.workStatus}
                    </Button>
                    <Button
                      className="text-white rounded-pill badge me-2 btn-dark badge-sm"
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
                      className="text-white rounded-pill badge me-2 btn-danger badge-sm"
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : null}
        {!loading && works.length === 0 && (
          <Col>
            <h6>No work here!</h6>
          </Col>
        )}
      </Row>
      <ModalComponent
        type="details"
        workTitle={detailsView.workTitle}
        workDescription={detailsView.workDescription}
        lastEdited={detailsView.lastEdited}
      />
      <ModalComponent type="edit" />
      <ModalComponent type="status" />
    </Container>
  );
};

export default WorkList;
