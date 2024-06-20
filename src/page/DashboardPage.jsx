import React from "react";
import Dashboard from "../components/User/Dashboard.jsx";
import WorkList from "../components/Works/WorkList.jsx";
import SearchQueryProvider from "../context/SearchQueryProvider.jsx";

const DashboardPage = () => {
  return (
    <div>
      <SearchQueryProvider>
        <Dashboard />
        <WorkList searchBar={false} />
      </SearchQueryProvider>
    </div>
  );
};

export default DashboardPage;
