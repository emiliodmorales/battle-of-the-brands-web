import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { useAuth } from "../../auth/AuthContext";

import { getTeamById, getTeamHistory, deleteTeam } from "../../api/teams";

export default function TeamViewer() {
  const { token, profile } = useAuth();
  const [team, setTeam] = useState();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const getTeamDetails = async () => {
      const t = await getTeamById(id);
      const h = await getTeamHistory(id);
      setTeam({ ...t, history: h });
    };
    getTeamDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteTeam(team.id, token);
      navigate("/teams");
    } catch (err) {
      alert(err.message || "Failed to delete team.");
    }
  };

  if (!team) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <section className="flex [&>section]:flex-1">
        <section>
          <p>{team.name}</p>
          <p>Created by {team.username}</p>
          {token && profile?.username === team.username && (
            <div style={{ marginTop: "1em" }}>
              <button onClick={handleDelete} style={{ color: "red" }}>
                Delete
              </button>
            </div>
          )}
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
      <section className="flex flex-wrap flex-row justify-center [&>img]:w-[30%]">
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
      {token && profile && profile.id === team.creator && (
        <section className="flex flex-row gap-2">
          <button onClick={handleDelete}>Delete</button>
        </section>
      )}
    </>
  );
}
