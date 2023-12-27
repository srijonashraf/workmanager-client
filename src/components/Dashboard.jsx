import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import {
  FetchTaskCount,
  GetProfileDetails,
  RecoverVerifyEmail,
} from "../apiRequest/apiRequest";
import { useNavigate } from "react-router-dom";
import unauthorized from "../utility/unauthorized";
import {
  clearSessions,
  getToken,
  setNewUser,
  setOTPEmail,
  setToken,
} from "../helper/SessionHelper";
import { errorToast, successToast } from "../helper/ToasterHelper";
import { Toaster } from "react-hot-toast";
const Dashboard = () => {
  const [taskCounts, setTaskCounts] = useState([]);
  const [profileDetails, setProfileDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  const formattedTime = currentTime.toLocaleTimeString(undefined, {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });


  //Leading to fast logging out from dashboard without verifying email and redirecting to verify page.
  // useEffect(() => {
  //   if (!getToken()) {
  //     unauthorized(401);
  //   }
  // });

  //For Clock
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every 1000 milliseconds (1 second)

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once on mount

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

    const ProfileResponse = await GetProfileDetails();
    if (ProfileResponse) {
      setProfileDetails(ProfileResponse.data.data[0]);
      // console.log(ProfileResponse.data.data[0]);
    }
  };

  const HandleVerifyButton = async () => {
    setLoading(true);
    const response = await RecoverVerifyEmail(profileDetails.email);
    try {
      if (response && response.status === 200) {
        successToast("Verification code sent to your email");
        setNewUser(true);
        setOTPEmail(profileDetails.email);
        window.location.href = "/verifyOTP";
        setToken("");
      } else {
        console.log("Failed to send verification code");
        errorToast("Failed to send verification code");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Toaster position="bottom-center" />
      {profileDetails?.verified === false ? (
        <Container id="top">
          <h1 className="mt-3">Please verify your email address!</h1>
          <Button disabled={loading} className="rounded-1" onClick={HandleVerifyButton}> {loading ? "Loading..." : "Verify"}</Button>
          <Button onClick={clearSessions} className="btn-danger rounded-1 mx-2"> Logout </Button>
        </Container>
      ) : (
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
            {taskCounts.map((statusCount) => (
              <Col key={statusCount.status} md={4} className="mb-3">
                <Card className="border-0 shadow">
                  <Card.Body
                    className="cursorPointer"
                    onClick={() =>
                      navigate(
                        `/${statusCount.status
                          .replace(/\s+/g, "")
                          .toLowerCase()}`
                      )
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
      )}
    </div>
  );
};

export default Dashboard;
