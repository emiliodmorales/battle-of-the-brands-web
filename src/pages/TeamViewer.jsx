import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useAuth } from "../auth/AuthContext";

import { getTeamById, getTeamHistory } from "../api/teams";
import "../styles/teams.css";

export default function TeamViewer() {
  const { token, getProfile } = useAuth();
  const [team, setTeam] = useState();
  const [profile, setProfile] = useState();

  const { id } = useParams();

  useEffect(() => {
    const getTeamDetails = async () => {
      const t = await getTeamById(id);
      const h = await getTeamHistory(id);
      setTeam({ ...t, history: h });
    };
    const tryGetProfile = async () => {
      const retrievedProfile = await getProfile();
      setProfile(retrievedProfile);
    };

    tryGetProfile();
    getTeamDetails();
  }, []);

  if (!team) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <section className="team-menu">
        <section>
          <p>{team.name}</p>
          <p>Created by {team.username}</p>
        </section>
        {token && (
          <section className="battle-button">
            {/* TODO - Edit battle link to pass in ID of this team in whatever way is appropriate */}
            <Link to="/battle">FIGHT</Link>
          </section>
        )}
        {team.history && (
          <section>
            <p>Total Battles</p>
            <p>
              {Number(team.history.wins)} W /{" "}
              {Number(team.history.total_battles) - Number(team.history.wins)} L
            </p>
          </section>
        )}
      </section>
      <section className="team-view">
        {team.characters.map((c) => (
          <section key={c.id} className="w-[30%] ">
            <section className="char-info">
              <Link to={`/characters/${c.id}`}>
                <h2>{c.name}</h2>
              </Link>
              <p>{c.hp} HP</p>
              <p>{c.attack} ATK</p>
              <p>{c.defense} DEF</p>
              <p>
                {c.ability_name ? `Ability: ${c.ability_name}` : "No Ability"}
              </p>
            </section>
            <img
              className="w-full max-w-full max-h-full object-contain"
              src={c.image}
              alt={c.name}
            ></img>
          </section>
        ))}
      </section>
    </>
  );
}
