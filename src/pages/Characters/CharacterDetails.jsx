import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  addFavoriteCharacter,
  deleteCharacter,
  getCharacterDetails,
  getCharacterHistory,
  getIsFavoriteCharacter,
  removeFavoriteCharacter,
} from "../../api/characters";
import { useAuth } from "../../auth/AuthContext";

export default function CharacterDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, profile } = useAuth();
  const [character, setCharacter] = useState();
  const [history, setHistory] = useState();

  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    const tryGetIsFavorite = async () => {
      const retrievedIsFavorite = await getIsFavoriteCharacter(id, token);
      setIsFavorite(retrievedIsFavorite);
    };
    tryGetIsFavorite();
  }, []);
  const favoriteChar = async () => {
    await addFavoriteCharacter(id, token);
    setIsFavorite(true);
  };
  const unfavoriteChar = async () => {
    await removeFavoriteCharacter(id, token);
    setIsFavorite(false);
  };

  useEffect(() => {
    const tryGetCharacter = async () => {
      const retrievedCharacter = await getCharacterDetails(id);
      setCharacter(retrievedCharacter);
    };
    tryGetCharacter();
  }, [id]);

  useEffect(() => {
    const tryGetHistory = async () => {
      const retrievedHistory = await getCharacterHistory(id);
      setHistory(retrievedHistory);
    };
    tryGetHistory();
  }, [id]);

  if (!character) return <p>Loading character details...</p>;

  const deleteChar = async () => {
    await deleteCharacter(token, character.id);
    navigate("/characters");
  };

  return (
    <section className="grid grid-cols-2 p-[1em] gap-[1em]">
      <section className="grid justify-center gap-[1em]">
        <h1>{character.name}</h1>
        {character.image && character.image !== "" && (
          <img
            className="max-w-[12em] max-h-[12em]"
            alt={"image of " + character.name}
            src={character.image}
          />
        )}
        <p>{character.description}</p>
        <p>
          {"Owner: "}
          <Link to={"/users/" + character.user_id}>{character.username}</Link>
        </p>
        {profile?.id === character.user_id && (
          <Link to="edit">
            <button className="w-full">Edit</button>
          </Link>
        )}
        {profile?.id === character.user_id && (
          <button onClick={deleteChar}>Delete</button>
        )}
        {token && isFavorite ? (
          <button onClick={unfavoriteChar}>Unfavorite</button>
        ) : (
          <button onClick={favoriteChar}>Favorite</button>
        )}
      </section>
      <section className="grid justify-center gap-[1em]">
        <h2>Character Stats</h2>
        <p>{character.hp} HP</p>
        <p>{character.attack} ATK</p>
        <p>{character.defense} DEF</p>
        <p>
          {character.ability_name
            ? `Ability: ${character.ability_name}`
            : "No Ability"}
        </p>
      </section>
      {history && history.battle_history ? (
        <section className="col-[2/3] row-[1/4] grid justify-center grid-cols-1 grid-rows-[1fr_1fr_1fr_1fr_20fr]">
          <h2>Battle History</h2>
          <section className="grid grid-cols-3 gap-6 mt-4">
            <section className="bg-[#f5f7fa] rounded-lg py-4 px-6 text-center ">
              <p className="text-[2rem] font-bold text-red-600">
                {history.wins}
              </p>
              <p className="block mt-2 text-[#555] text-[2rem]">Wins</p>
            </section>
            <section className="bg-[#f5f7fa] rounded-lg py-4 px-6 text-center ">
              <p className="text-[2rem] font-bold text-red-600">
                {history.losses}
              </p>
              <p className="block mt-2 text-[#555] text-[2rem]">Losses</p>
            </section>
            <section className="bg-[#f5f7fa] rounded-lg py-4 px-6 text-center ">
              <p className="text-[2rem] font-bold text-red-600">
                {history.draws}
              </p>
              <p className="block mt-2 text-[#555] text-[2rem]">Draws</p>
            </section>
          </section>
        </div>
      )}
    </section>
  );
}
