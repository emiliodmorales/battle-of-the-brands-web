import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

// TODO - I understand CSS, but I am absolutely terrible with design.

import { Link } from "react-router";
import { getTeams } from "../api/teams";

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
    <section className="flex">
      {token && (
        <section className="flex-1">
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
      <section className="flex-1">
        {/*TODO - Entire search engine */}
        <p>How do I make a search engine</p>
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
        /* Smaller fixed width when viewing as part of a deck of team cards instead of one team */
        <ul className="bg-[#808080] max-w-[30vw]">{teams.map(TeamCard)}</ul>
      ) : (
        "Looks like there's nothing here right now!"
      )}
    </section>
  );
}

function TeamCard(team) {
  return (
    <li key={team.id}>
      <Link to={String(team.id)}>
        <p>{team.name}</p>
        {/* When viewing team icons, always display in 2 rows */}
        <section className="flex flex-wrap flex-row justify-center">
          {team.characters.map((c) => (
            <img className="w-[30%]" key={c.id} src={c.image}></img>
          ))}
        </section>
      </Link>
    </li>
  );
}
