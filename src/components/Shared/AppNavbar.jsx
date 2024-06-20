import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Container, Navbar, Offcanvas } from "react-bootstrap";
import { clearSessions } from "../../helper/SessionHelper.js";
import { NavLink } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import Dropdown from "react-bootstrap/Dropdown";
import { CiLogout } from "react-icons/ci";
import { GetProfileDetails } from "../../apiRequest/apiRequest.js";
import Avatar from "react-avatar";
import { MdDashboard } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { AiFillClockCircle } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { IoIosCloudDone } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { FaBarsProgress } from "react-icons/fa6";
import { IoFileTrayStacked } from "react-icons/io5";

const AppNavbar = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [img, setImg] = useState("");

  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const closeOffcanvas = () => {
    setShowOffcanvas(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetProfileDetails();
        setFirstName(res.data.data[0].firstName);
        setImg(res.data.data[0].img);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const navItems = [
    {
      id: 1,
      name: "Dashboard",
      path: "/",
      icon: <MdDashboard />,
    },
    {
      id: 2,
      name: "Create Work",
      path: "/createWork",
      icon: <IoIosCreate />,
    },
    {
      id: 3,
      name: "All Work",
      path: "/allWork",
      icon: <IoFileTrayStacked />,
    },
    {
      id: 4,
      name: "Pending",
      path: "/workByStatus/Pending",
      icon: <AiFillClockCircle />,
    },
    {
      id: 5,
      name: "In Progress",
      path: "/workByStatus/In Progress",
      icon: <FaBarsProgress />,
    },
    {
      id: 6,
      name: "Done",
      path: "/workByStatus/Done",
      icon: <IoIosCloudDone />,
    },
    {
      id: 7,
      name: "Cencelled",
      path: "/workByStatus/Cancelled",
      icon: <MdCancel />,
    },
    {
      id: 8,
      name: "Settings",
      path: "/profile",
      icon: <IoSettings />,
    },
  ];

  return (
    <div className={`app-container ${showOffcanvas ? "offcanvas-open" : ""}`}>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-primary-subtle"
        data-bs-theme="dark"
      >
        <Container className="my-2 my-lg-0 d-flex justify-content-between">
          <div className="NavBrand d-flex align-items-center">
            <RiMenuUnfoldFill
              className="text-warning mx-2 cursorPointer fs-5"
              onClick={toggleOffcanvas}
            />
            <NavLink to={"/dashboard"} className="navbar-brand">
              Work Manager
            </NavLink>
          </div>

          <Dropdown className="user-dropdown">
            <Dropdown.Toggle
              as={BiUserCircle}
              id="dropdown-basic"
              className="navBarUserIcon border-0"
            ></Dropdown.Toggle>

            <Dropdown.Menu className="user-dropdown-content">
              <div className="mt-4 text-center">
                <NavLink className="nav-link" to="/profile">
                  <Avatar
                    src={img}
                    size="40"
                    className="mb-2 cursorPointer"
                    round={true}
                  />
                </NavLink>

                <h6 className="cursorPointer">
                  <NavLink className="nav-link" to="/profile">
                    {firstName}
                  </NavLink>
                </h6>
                <Dropdown.Divider />
              </div>

              <Dropdown.Item className="d-flex align-items-center gap-1">
                <NavLink className="nav-link" to="/profile">
                  <IoSettingsOutline /> Setting
                </NavLink>
              </Dropdown.Item>
              <Dropdown.Item
                className="d-flex align-items-center gap-1"
                onClick={clearSessions}
              >
                <CiLogout /> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>

      <Offcanvas show={showOffcanvas} onHide={closeOffcanvas} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Work Manager</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="list-group list-group-flush list-unstyled">
            {navItems.map((item) => {
              return (
                <li key={item.id.toString()}>
                  <NavLink
                    onClick={closeOffcanvas}
                    to={item.path}
                    className="list-group-item border-0 rounded-1 d-flex gap-2 align-items-center custom-nav-link"
                  >
                    {item.icon}
                    {item.name}
                  </NavLink>
                </li>
              );
            })}
            <Button
              onClick={clearSessions}
              className="d-flex rounded-1 align-items-center gap-1"
              variant="danger"
            >
              <CiLogout /> Logout
            </Button>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default AppNavbar;
