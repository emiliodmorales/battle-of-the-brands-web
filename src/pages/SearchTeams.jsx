import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { getTeams } from "../api/teams";

import TeamCard from "./TeamCard";

export default function SearchTeams() {
  const [teams, setTeams] = useState([]);
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get("search");

  useEffect(() => {
    const tryGetTeams = async () => {
      const t = await getTeams();
      setTeams(t);
    };
    tryGetTeams();
  }, []);

  return (
    <>
      <form>
        <search>
          <input type="text" name="search" defaultValue={searchText} />
          <button>Search</button>
        </search>
      </form>
      {searchText && searchText !== "" && (
        <section className="search-teams">
          <h2>Search Results</h2>
          <ul className="team-deck">
            {teams
              .filter((team) =>
                team.name.toLowerCase().includes(searchText.toLowerCase()),
              )
              .map(TeamCard)}
          </ul>
        </section>
      )}
    </>
  );
}
