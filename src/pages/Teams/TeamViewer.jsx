import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useAuth } from "../../auth/AuthContext";

import {
  getTeamById,
  getTeamHistory,
  getIsFavoriteTeam,
  addFavoriteTeam,
  removeFavoriteTeam,
} from "../../api/teams";

export default function TeamViewer() {
  const { token, profile } = useAuth();
  const [team, setTeam] = useState();
  const [isFavorite, setIsFavorite] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const tryGetIsFavorite = async () => {
      const retrievedIsFavorite = await getIsFavoriteTeam(id, token);
      setIsFavorite(retrievedIsFavorite);
    };
    tryGetIsFavorite();
  }, []);
  const favoriteTeam = async () => {
    await addFavoriteTeam(id, token);
    setIsFavorite(true);
  };
  const unfavoriteTeam = async () => {
    await removeFavoriteTeam(id, token);
    setIsFavorite(false);
  };

  useEffect(() => {
    const getTeamDetails = async () => {
      const t = await getTeamById(id);
      const h = await getTeamHistory(id);
      setTeam({ ...t, history: h });
    };
    getTeamDetails();
  }, []);

  if (!team) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <section className="flex [&>section]:flex-1 text-center">
        <section>
          <p>{team.name}</p>
          <p>Created by {team.username}</p>
          {token && isFavorite ? (
            <button onClick={unfavoriteTeam}>Unfavorite</button>
          ) : (
            <button onClick={favoriteTeam}>Favorite</button>
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
          <section key={c.id} className="w-[25%] flex flex-row char m-5 p-5">
            <section className="flex-1 text-center">
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
              className="w-[75%] max-w-full max-h-full object-contain"
              src={c.image}
              alt={c.name}
            ></img>
          </section>
        ))}
      </section>
    </>
  );
}
