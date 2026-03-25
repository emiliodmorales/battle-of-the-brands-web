import { useEffect } from "react";
import { useState } from "react";

// TODO - I understand CSS, but I am absolutely terrible with design.

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
  const [bestTeams, setBestTeams] = useState([]);

  const tryGetTeams = async () => {
    const teams = await getTeams();
    setAllTeams(teams);
  };
  const filterTeams = async (token) => {
    setYourTeams(allTeams?.filter((t) => t.user_id === profile.id));
    const faves = await getFavoriteTeams(token);
    setFaveTeams(faves);
    // TODO - Best teams (highest win ratio)
    setBestTeams(yourTeams?.filter(() => false));
  };

  useEffect(() => {
    tryGetTeams();
  }, []);
  useEffect(() => {
    if (token) {
      filterTeams(token);
    }
  }, [allTeams]);

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
          <TeamList
            heading="Best Teams"
            className="bestTeams"
            teams={bestTeams}
          />

          {/*TODO - Edit Link when Team Builder page is made*/}
          <Link to="/">
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
