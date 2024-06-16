import React from "react";
import Dashboard from "../components/User/Dashboard.jsx";
import WorkByStatus from "./../components/Works/WorkByStatus";

const DashboardPage = () => {
  return (
    <div>
      <Dashboard />
      <WorkByStatus />
    </div>
  );
};

export default DashboardPage;
