import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { getTeams } from "../../api/teams";
import CombatCard from "./CombatCard";

export default function CombatTeamSearch({ onSelectTeam }) {
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
        <search className="mt-2">
          <input
            className="border border-black rounded-md bg-neutral-200 text-black"
            type="text"
            name="search"
            defaultValue={searchText}
          />
          <button className="ml-2 rounded-md">Search</button>
        </search>
      </form>
      {searchText && searchText !== "" && (
        <section className="search-teams">
          <h2>Search Results</h2>
          {/* Smaller fixed width when viewing as part of a deck of team cards instead of one team */}
          <ul className="max-w-[30vw] list-none">
            {teams
              .filter((team) =>
                team.name.toLowerCase().includes(searchText.toLowerCase()),
              )
              .map((team) => (
                <div onClick={() => onSelectTeam(team.id)} key={team.id}>
                  <CombatCard team={team} />
                </div>
              ))}
          </ul>
        </section>
      )}
    </>
  );
}
