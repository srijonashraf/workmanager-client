import React, { useEffect, useState, useContext } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { AllWork } from "../../apiRequest/apiRequest.js";
import parse from "html-react-parser";
import ModalComponent from "./Modal";
import ModelContext from "../../context/ModalContext.js";

const AllWorkList = () => {
  const [works, setWorks] = useState([]);

  const {
    loading,
    setLoading,
    change,
    setShowStatusModal,
    setSelectedWorkId,
    setSelectedWorkIdForUpdate,
    setShowEditModal,
    setEditableFields,
    DeleteWorkRequest,
  } = useContext(ModelContext);

  useEffect(() => {
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

    FetchAllWorks();
  }, [change]);

  return (
    <Container className="mt-3">
      <hr />
      <h4 className="my-4 text-center fw-bold">Work List</h4>
      <hr />
      <Row className="row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-3 g-4">
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
            <Col key={work._id} className="mb-3 d-flex">
              <Card className="shadow border-0 w-100 d-flex flex-column">
                <Card.Body className="d-flex flex-column">
                  <h5 className="fw-bold">{work.workTitle}</h5>
                  <div className="md-text">
                    {work.workDescription.length > 200
                      ? parse(
                          work.workDescription.slice(0, 200) +
                            "<span>...</span>"
                        )
                      : parse(work.workDescription)}
                  </div>
                  <Card.Footer className="mt-auto">
                    <div className="button d-flex justify-content-center">
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
                        onClick={() => {
                          setShowStatusModal(true);
                          setSelectedWorkId(work._id);
                        }}
                      >
                        {work.workStatus}
                      </Button>

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
                      <ModalComponent type="edit" />
                      <Button
                        onClick={() => DeleteWorkRequest(work._id)}
                        className="btn-sm rounded-1 btn-danger"
                      >
                        Delete
                      </Button>
                    </div>

                    <ModalComponent type="status" />
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
    </Container>
  );
};

export default AllWorkList;
