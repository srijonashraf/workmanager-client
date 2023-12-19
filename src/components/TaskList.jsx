import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { AllTask } from "../apiRequest/apiRequest";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const fetchAllTasks = async () => {
    try {
      setLoading(true);
      const response = await AllTask();

      if (response && response.data && response.status === 200) {
        setTasks(response.data.data); // Assuming the actual data is in the 'data' property
        console.log("Tasks fetched successfully");
      } else {
        setError("Invalid response format. Please try again.");
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Failed to fetch tasks", error);
      setError("Failed to fetch tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="mt-3">
      <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
        {loading ? (
          <Col className="mb-3">
            <p>Loading...</p>
          </Col>
        ) : error ? (
          <Col className="mb-3">
            <p style={{ color: "red" }}>{error}</p>
          </Col>
        ) : (
          tasks.map((task) => (
            <Col key={task._id} className="mb-3">
              <Card className="h-100 shadow border-0">
                <Card.Body>
                  <h5>{task.workTitle}</h5>
                  <p>{task.workDescription}</p>
                  <Button className="text-white btn btn-success btn-sm me-2">Status: {task.workStatus}</Button>
                  <Button className="btn-sm btn-dark me-2">Edit</Button>
                  <Button className="btn-sm btn-danger">Delete</Button>
                  <p className="text-muted sm-text float-end mt-2">Last Updated: {task.updatedAt}</p>
                  
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
