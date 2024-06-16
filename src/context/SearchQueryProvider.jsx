import React, { useCallback, useState } from "react";
import SearchQueryContext from "./SearchQuearyContext";
import { WorkSearchList } from "../apiRequest/apiRequest";
import { errorToast } from "../helper/ToasterHelper";

const SearchQueryProvider = ({ children }) => {
  const [query, setQuery] = useState(null);
  const [queryResult, setQueryResult] = useState(null);

  const QuerySearchRequest = async (query) => {
    try {
      const response = await WorkSearchList(query);
      if (response) {
        setQueryResult(response.data.data);
      } else {
        errorToast("Failed to fetch");
      }
    } catch (err) {
      console.error(err);
      errorToast("Failed to fetch");
    }
  };

  // useCallback hook is used to memoize the function
  const handleQuerySearch = useCallback(() => {
    if (query) {
      QuerySearchRequest(query);
    } else {
      setQueryResult(null);
    }
  }, [query]);

  return (
    <SearchQueryContext.Provider
      value={{
        query,
        setQuery,
        handleQuerySearch,
        queryResult,
        setQueryResult,
      }}
    >
      {children}
    </SearchQueryContext.Provider>
  );
};

export default SearchQueryProvider;
