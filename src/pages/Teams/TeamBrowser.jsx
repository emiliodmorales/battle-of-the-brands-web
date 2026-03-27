import { useEffect } from "react";
import { useState } from "react";

import { Link } from "react-router";
import { getTeams, getFavoriteTeams } from "../../api/teams";
import SearchTeams from "./SearchTeams";
import TeamCard from "./TeamCard";
import { useAuth } from "../../auth/AuthContext";

export default function TeamBrowser() {
  const { token, profile } = useAuth();
  const [allTeams, setAllTeams] = useState([]);
  const [yourTeams, setYourTeams] = useState([]);
  const [faveTeams, setFaveTeams] = useState([]);

  const tryGetTeams = async () => {
    const teams = await getTeams();
    setAllTeams(teams);
  };
  const filterTeams = async (token) => {
    setYourTeams(allTeams?.filter((t) => t.user_id === profile.id));
    const faves = await getFavoriteTeams(token);
    setFaveTeams(faves);
  };

  useEffect(() => {
    tryGetTeams();
  }, []);
  useEffect(() => {
    if (profile) {
      filterTeams(token);
    }
  }, [allTeams, profile]);

  return (
    <section className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <section className="w-full max-w-5xl mx-auto mb-8 flex justify-center">
        <div className="w-full max-w-lg">
          <SearchTeams />
        </div>
      </section>
      <section className="flex flex-col md:flex-row gap-8 items-start justify-center w-full max-w-5xl mx-auto">
        {token && (
          <>
            <section className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex-1">
              <TeamList
                heading="Your Teams"
                className="yourTeams"
                teams={yourTeams}
              />
            </section>
            <section className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex-1">
              <TeamList
                heading="Favorite Teams"
                className="faveTeams"
                teams={faveTeams}
              />
            </section>
          </>
        )}
      </section>
      {token && (
        <section className="w-full flex justify-center mt-12">
          <Link to="/teams/new" className="w-full max-w-md block">
            <button
              className="w-full py-2 rounded bg-black text-white font-semibold hover:bg-red-600 transition border-2 border-red-600 text-lg tracking-wider"
              style={{ fontFamily: "Papyrus, fantasy" }}
            >
              Build a New Team!
            </button>
          </Link>
        </section>
      )}
    </section>
  );
}

function TeamList({ heading, className, teams }) {
  return (
    <section
      className={
        className +
        " bg-gray-100 dark:bg-gray-800 rounded-lg shadow p-4 w-full max-w-md mb-6"
      }
    >
      <h1
        className="text-2xl font-bold text-red-700 mb-2"
        style={{ fontFamily: "Papyrus, fantasy" }}
      >
        {heading}
      </h1>
      {teams.length ? (
        <ul className="max-w-[30vw] list-none m-5 flex flex-col gap-4">
          {teams.map(TeamCard)}
        </ul>
      ) : (
        <p className="text-gray-500 italic">
          Looks like theres nothing here right now!
        </p>
      )}
    </section>
  );
}
