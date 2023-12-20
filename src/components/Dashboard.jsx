import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { FetchTaskCount } from "../apiRequest/apiRequest";
import { getUserEmail } from "../helper/SessionHelper";

const userEmail = getUserEmail();
const Dashboard = () => {
  const [taskCounts, setTaskCounts] = useState([]);

  useEffect(() => {
    fetchTaskCounts();
  }, []);

  const fetchTaskCounts = async () => {
    const response = await FetchTaskCount();
    if (response && response.status === 200) {
      setTaskCounts(response.data.data.statuses);
    } else {
      console.log("Failed to fetch task counts");
    }
  };

  return (
    <div>
      <Container>
        <h2 className="mt-3 d-flex align-items-baseline gap-2">
          Hi!{" "}
          <span className="h4">
            {`(${userEmail}) `}
            <span className="blog-title-emoji">👋</span>
          </span>
        </h2>
        <Row xs={12}>
          {taskCounts.map((statusCount) => (
            <Col key={statusCount.status} md={4} className="mb-3">
              <Card className="border-0 shadow">
                <Card.Body>
                  <Card.Title>{statusCount.status}</Card.Title>
                  <Card.Text className="fw-bold text-muted">
                    {statusCount.count}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
