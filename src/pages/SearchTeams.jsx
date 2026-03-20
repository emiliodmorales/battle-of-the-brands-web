import { useState, useEffect } from "react";

export default function SearchTeams() {
  const [searchParams, setSearchParams] = useState();
  const [searchResults, setSearchResults] = useState();

  useEffect(() => {
    setSearchParams("something something search params");
  }, [searchParams]);

  return <></>;
}
