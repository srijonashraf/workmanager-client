import React from "react";
import { Container } from "react-bootstrap";
import WorkList from "../components/Works/WorkList";
import SearchQueryProvider from "../context/SearchQueryProvider";

const WorkListPage = () => {
  return (
    <div>
      <SearchQueryProvider>
        <Container>
          <WorkList />
        </Container>
      </SearchQueryProvider>
    </div>
  );
};

export default WorkListPage;
