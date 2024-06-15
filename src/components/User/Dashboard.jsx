import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { FetchTaskCount, GetProfileDetails } from "../apiRequest/apiRequest";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const [taskCounts, setTaskCounts] = useState([]);
  const [profileDetails, setProfileDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  const formattedTime = currentTime.toLocaleTimeString(undefined, {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  // For Clock
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await FetchTaskCount();
        console.log("FetchTaskCount From Dashboard");
        if (!response) {
          console.log("Failed to fetch task count");
        } else {
          setTaskCounts(response.data.data.statuses);
        }

        const profileResponse = await GetProfileDetails();
        console.log("GetProfileDetails From Dashboard");

        if (!profileResponse) {
          console.log("Failed to fetch profile");
        } else {
          setProfileDetails(profileResponse.data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleVerifyButton = () => {
    navigate(`/sendOTP/${profileDetails.email}`);
  };

  return (
    <div>
      <Toaster position="bottom-center" />
      {profileDetails?.verified === false && (
        <Container
          id="top"
          className="container-fluid d-flex flex-row gap-2 align-items-center bg-danger text-white"
        >
          <h4 className="mt-3">Please verify your email address!</h4>
          <Button
            disabled={loading}
            className="rounded-1"
            variant="outline-light"
            onClick={handleVerifyButton}
          >
            {loading ? "Loading..." : "Verify"}
          </Button>
        </Container>
      )}
      <Container>
        <h2 className="mt-3 d-flex align-items-baseline gap-2 justify-content-between">
          <div>
            Hi!{" "}
            <span className="h4">
              {`(${profileDetails?.firstName || ""} ${
                profileDetails?.lastName || ""
              }) `}
              <span className="blog-title-emoji">👋</span>
            </span>
          </div>
          <p className="h1">{formattedTime}</p>
        </h2>
        <Row xs={12}>
          {taskCounts
            .sort((a, b) =>
              a.status.toLowerCase() < b.status.toLowerCase()
                ? -1
                : a.status.toLowerCase() > b.status.toLowerCase()
                ? 1
                : 0
            )
            .map((statusCount) => (
              <Col key={statusCount.status} md={4} className="mb-3">
                <Card className="border-0 shadow">
                  <Card.Body
                    className="cursorPointer"
                    onClick={() =>
                      navigate(`/taskByStatus/${statusCount.status}`)
                    }
                  >
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
