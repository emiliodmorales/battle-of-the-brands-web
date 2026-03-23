import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useAuth } from "../auth/AuthContext";

import { getTeamById } from "../api/teams";
import "../styles/teams.css";

export default function TeamViewer() {
  const { token, getProfile } = useAuth();
  const [team, setTeam] = useState();

  const { id } = useParams();

  useEffect(() => {
    const getTeamDetails = async () => {
      const t = await getTeamById(id);
      setTeam(t);
    };
    getTeamDetails();
  }, []);

  if (!team) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <section className="team-menu">
        <p>Team info here</p>
        {token && <p>Battle button here</p>}
        <p>More team stats here</p>
      </section>
      <section className="team-view">
        {team.characters.map((c) => (
          <section key={c.id} className="character">
            <img src={c.image} alt={c.name}></img>
            <Link to={`/characters/${c.id}`}>
              <h2>{c.name}</h2>
            </Link>
            <section className="char-stats">
              <p>{c.hp} HP</p>
              <p>{c.attack} ATK</p>
              <p>{c.defense} DEF</p>
            </section>
            <p>
              {c.ability_name ? `Ability: ${c.ability_name}` : "No Ability"}
            </p>
          </section>
        ))}
      </section>
    </>
  );
}
