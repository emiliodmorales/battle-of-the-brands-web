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
    <section className="flex [&>section]:flex-1">
      {token && (
        <section>
          <TeamList
            heading="Your Teams"
            className="yourTeams"
            teams={yourTeams}
          />
          <TeamList
            heading="Favorite Teams"
            className="faveTeams"
            teams={faveTeams}
          />

          <Link to="/teams/new">
            <h3>Build a New Team!</h3>
          </Link>
        </section>
      )}
      <section>
        <SearchTeams />
      </section>
    </section>
  );
}

// Made it to be flexible, but should I be hardcoding instead?
function TeamList({ heading, className, teams }) {
  return (
    <section className={className}>
      <h3>{heading}</h3>
      {teams.length ? (
        <ul className="max-w-[30vw] list-none">{teams.map(TeamCard)}</ul>
      ) : (
        "Looks like there's nothing here right now!"
      )}
    </section>
  );
}
