import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

// TODO - I understand CSS, but I am absolutely terrible with design.
import "../styles/teams.css";

import { Link } from "react-router";
import { getTeams } from "../api/teams";
import SearchTeams from "./SearchTeams";
import TeamCard from "./TeamCard";

export default function TeamBrowser() {
  const { token, getProfile } = useAuth();
  const [allTeams, setAllTeams] = useState([]);
  const [yourTeams, setYourTeams] = useState([]);
  const [faveTeams, setFaveTeams] = useState([]);
  const [bestTeams, setBestTeams] = useState([]);

  const tryGetTeams = async () => {
    const teams = await getTeams();
    setAllTeams(teams);
  };
  const filterTeams = async () => {
    const profile = await getProfile();
    setYourTeams(allTeams?.filter((t) => t.user_id === profile.id));
    // TODO - Favorite teams (most used, or flagged?)
    setFaveTeams(yourTeams?.filter(() => false));
    // TODO - Best teams (highest win ratio)
    setBestTeams(yourTeams?.filter(() => false));
  };

  useEffect(() => {
    tryGetTeams();
  }, []);
  useEffect(() => {
    if (token) {
      filterTeams();
    }
  }, [allTeams]);

  return (
    <section className="team-browser">
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
        {/*TODO - Entire search engine */}
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
        <ul className="team-deck">{teams.map(TeamCard)}</ul>
      ) : (
        "Looks like there's nothing here right now!"
      )}
    </section>
  );
}
