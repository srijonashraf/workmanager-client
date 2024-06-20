import React, { useState, useEffect, useContext } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import {
  FetchWorkCount,
  GetProfileDetails,
} from "../../apiRequest/apiRequest.js";
import { useNavigate } from "react-router-dom";
import SearchQueryContext from "../../context/SearchQuearyContext.js";
import ModalContext from "./../../context/ModalContext";

const Dashboard = () => {
  const [workCounts, setWorkCounts] = useState([]);
  const [profileDetails, setProfileDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setQuery, handleQuerySearch } = useContext(SearchQueryContext);
  const { change } = useContext(ModalContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await FetchWorkCount();
        if (!response) {
          console.log("Failed to fetch work count");
        } else {
          setWorkCounts(response.data.data.statuses);
        }

        const profileResponse = await GetProfileDetails();

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
  }, [change]);

  const handleVerifyButton = () => {
    navigate(`/sendOTP/${profileDetails.email}`);
  };

  return (
    <div>
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
        <h2 className="my-3 d-flex flex-column flex-sm-row align-items-baseline gap-2 justify-content-between">
          <div>
            Hi!{" "}
            <span className="h4">
              {`(${profileDetails?.firstName || ""} ${
                profileDetails?.lastName || ""
              }) `}
              <span className="blog-title-emoji">👋</span>
            </span>
          </div>
          <div className="input-group w-auto form-control-sm">
            <input
              type="text"
              className="form-control"
              placeholder="Search Work"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <button
              className="btn bg-primary-subtle btn-sm text-white"
              data-bs-theme="dark"
              type="submit"
              onClick={handleQuerySearch}
            >
              Search
            </button>
          </div>
        </h2>
        <Row xs={12}>
          {workCounts
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
                      navigate(`/workByStatus/${statusCount.status}`)
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
