import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { getTeams } from "../../api/teams";

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
        <search className="flex gap-2 mb-4">
          <input
            className="border border-black rounded-md bg-white text-black px-2 py-1 font-[Papyrus, fantasy] text-lg"
            type="text"
            name="search"
            defaultValue={searchText}
          />
          <button className="rounded-md bg-black text-white px-4 py-1 font-bold hover:bg-red-600 transition border-2 border-red-600">
            Search
          </button>
        </search>
      </form>
      {searchText && searchText !== "" && (
        <section className="search-teams">
          <h2
            className="text-xl font-bold text-red-700 mb-2"
            style={{ fontFamily: "Papyrus, fantasy" }}
          >
            Search Results
          </h2>
          <ul className="max-w-[30vw] list-none flex flex-col gap-4">
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
