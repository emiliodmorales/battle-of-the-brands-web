import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { useAuth } from "../../auth/AuthContext";

import {
  getTeamById,
  getTeamHistory,
  getIsFavoriteTeam,
  addFavoriteTeam,
  removeFavoriteTeam,
  deleteTeam,
} from "../../api/teams";
import { getAbilities } from "../../api/abilities";

export default function TeamViewer() {
  const { token, profile } = useAuth();
  const [team, setTeam] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const [abilities, setAbilities] = useState({});

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
  }, [id]);

  useEffect(() => {
    const tryGetAbilities = async () => {
      const retrievedAbilities = await getAbilities();
      const newAbilities = retrievedAbilities.reduce((list, ability) => {
        list[ability.id] = ability.name;
        return list;
      }, {});
      setAbilities(newAbilities);
    };
    tryGetAbilities();
  }, []);

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
      <section className="flex [&>section]:flex-1 text-center">
        <section>
          <h1
            className="text-3xl font-extrabold text-black mb-1 drop-shadow"
            style={{ fontFamily: "Papyrus, fantasy", letterSpacing: "0.08em" }}
          >
            {team.name}
          </h1>
          <p
            className="text-lg font-semibold text-black dark:text-white mb-2"
            style={{ fontFamily: "Papyrus, fantasy", letterSpacing: "0.04em" }}
          >
            Created by <span className="text-red-600">{team.username}</span>
          </p>
          {token && (
            <div className="flex flex-col gap-2 items-center">
              <button
                onClick={isFavorite ? unfavoriteTeam : favoriteTeam}
                className={`px-4 py-1 rounded font-bold shadow border-2 transition text-lg ${isFavorite ? "bg-red-600 text-white border-black hover:bg-black" : "bg-white text-red-600 border-red-600 hover:bg-red-600 hover:text-white"}`}
                style={{ fontFamily: "Papyrus, fantasy" }}
              >
                {isFavorite ? "★ Favorited" : "☆ Favorite"}
              </button>
              {profile?.username === team.username && (
                <button
                  onClick={handleDelete}
                  className="px-4 py-1 rounded bg-red-600 text-white font-bold shadow hover:bg-black transition border-2 border-black"
                  style={{ fontFamily: "Papyrus, fantasy" }}
                >
                  Delete Team
                </button>
              )}
            </div>
          )}
        </section>
        {token && (
          <section className="battle-button flex items-center justify-center mt-2">
            <Link
              to={`/battle?defender=${id}`}
              className="px-6 py-2 rounded bg-black text-white font-bold text-lg tracking-widest shadow hover:bg-red-600 transition border-2 border-red-600"
              style={{
                letterSpacing: "0.15em",
                fontFamily: "Papyrus, fantasy",
              }}
            >
              FIGHT
            </Link>
          </section>
        )}
        {team.history && (
          <section className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 rounded-lg shadow p-4 mx-2 my-2 w-fit min-w-[180px]">
            <p
              className="text-lg font-bold text-red-600 dark:text-red-400 mb-1"
              style={{ fontFamily: "Papyrus, fantasy" }}
            >
              Total Battles
            </p>
            <p className="text-xl font-semibold text-black dark:text-white">
              {Number(team.history.wins)}{" "}
              <span className="text-red-600">W</span> /{" "}
              {Number(team.history.total_battles) - Number(team.history.wins)}{" "}
              <span className="text-red-600">L</span>
            </p>
          </section>
        )}
      </section>
      <section className="flex flex-wrap flex-row justify-center [&>img]:w-[30%]">
        {team.characters.map((c) => (
          <section key={c.id} className="w-[25%] flex flex-row char m-5 p-5">
            <section className="flex-1 text-center">
              <Link to={`/characters/${c.id}`} className="group">
                <h2 className="text-black group-hover:text-red-700 transition-colors cursor-pointer">
                  {c.name}
                </h2>
              </Link>
              <p className="text-black">{c.hp} HP</p>
              <p className="text-black">{c.attack} ATK</p>
              <p className="text-black">{c.defense} DEF</p>
              <p className="text-black">
                {c.ability_id
                  ? `Ability: ${abilities[c.ability_id]}`
                  : "No Ability"}
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
      {token && profile && profile.id === team.creator && (
        <section className="flex flex-row gap-2">
          <button onClick={handleDelete}>Delete</button>
        </section>
      )}
    </>
  );
}
