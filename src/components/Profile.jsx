import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { ProfileUpdate, GetProfileDetails } from "../apiRequest/apiRequest";
import { successToast, errorToast } from "../helper/ToasterHelper";
import { Toaster } from "react-hot-toast";
import { BiUserCircle } from "react-icons/bi";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    firstName: "",
    lastName: "",
    mobile: "",
    currentPassword: "",
    newPassword: "",
    address: "",
  });

  const [profileDetailsResponse, setProfileDetailsResponse] = useState(null);

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const response = await GetProfileDetails();
        // console.log("Profile Details Response:", response);

        if (
          response &&
          response.data &&
          response.data.status === "success" &&
          response.data.data.length > 0
        ) {
          setProfileDetailsResponse(response);
          const userDetails = response.data.data[0];
          setFormValues({
            email: userDetails.email,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            mobile: userDetails.mobile,
            currentPassword: "",
            newPassword: "",
            address: userDetails.address,
          });
        } else {
          console.log("Frontend: Profile Details failed to fetch");
        }
      } catch (error) {
        console.error("Error fetching profile details:", error);
      }
    };

    fetchProfileDetails();
  }, []); // Empty dependency array to run once when component mounts

  const UpdateProfileRequest = async () => {
    try {
      // Fetch the password from the database
      const passwordFromDB =
        (await profileDetailsResponse?.data.data[0]?.password) || "";
      // console.log("Password from DB:", passwordFromDB);

      // Check if any field is empty
      if (
        !formValues.email ||
        !formValues.firstName ||
        !formValues.lastName ||
        !formValues.currentPassword ||
        !formValues.newPassword ||
        !formValues.mobile ||
        !formValues.address
      ) {
        errorToast("Please fill in all the fields.");
        return;
      }

      setLoading(true);

      // Check if the entered current password matches the password from the database
      if (formValues.currentPassword === passwordFromDB) {
        // If matched, update the profile with the new password
        const updatedProfile = {
          employeeId: profileDetailsResponse?.data.data[0]?.employeeId,
          email: formValues.email,
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          mobile: formValues.mobile,
          password: formValues.newPassword, // Use newPassword instead of password
          address: formValues.address,
          position: profileDetailsResponse?.data.data[0]?.position,
          department: profileDetailsResponse?.data.data[0]?.department,
        };

        // console.log("Updated Profile Data:", updatedProfile);

        const response = await ProfileUpdate(updatedProfile);

        // console.log("Update Profile Response:", response);

        if (response) {
          successToast("Profile Updated Successfully!");

          // Set a timer for 1 second before redirecting
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        } else {
          errorToast("Failed to update Profile Data!");
        }
      } else {
        // If passwords do not match, show an error message
        errorToast("Current Password does not match. Please try again.");
      }
    } catch (err) {
      console.error(err);
      errorToast("Failed to update Profile Data!");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    UpdateProfileRequest();
  };
  return (
    <div>
      <Container>
        <Toaster position="top-right" />
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={8} lg={8}>
            <Card className="border-0 rounded-4 mx-auto shadow">
              <Card.Body>
                <BiUserCircle className="display-1 text-primary" /> <hr />
                <Form
                  className="animated fadeInUp mt-2"
                  onSubmit={handleSubmit}
                >
                  <Row className="mb-3">
                    <Col>
                      <InputGroup>
                        <FormControl
                          type="email"
                          placeholder="Email Address"
                          value={formValues.email}
                          disabled
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col>
                      <InputGroup>
                        <FormControl
                          type="text"
                          placeholder="First Name"
                          name="firstName"
                          value={formValues.firstName}
                          onChange={handleChange}
                          required
                        />
                      </InputGroup>
                    </Col>
                    <Col>
                      <InputGroup>
                        <FormControl
                          type="text"
                          placeholder="Last Name"
                          name="lastName"
                          value={formValues.lastName}
                          onChange={handleChange}
                          required
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col>
                      <InputGroup>
                        <FormControl
                          type="password"
                          placeholder="Current Password"
                          name="currentPassword"
                          value={formValues.currentPassword}
                          onChange={handleChange}
                          required
                        />
                      </InputGroup>
                    </Col>
                    <Col>
                      <InputGroup>
                        <FormControl
                          type="password"
                          placeholder="New Password"
                          name="newPassword"
                          value={formValues.newPassword}
                          onChange={handleChange}
                          required
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col>
                      <InputGroup>
                        <FormControl
                          type="tel"
                          placeholder="Mobile"
                          name="mobile"
                          value={formValues.mobile}
                          onChange={handleChange}
                          required
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col>
                      <InputGroup>
                        <FormControl
                          type="text"
                          placeholder="Address"
                          name="address"
                          value={formValues.address}
                          onChange={handleChange}
                          required
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Update Profile"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
