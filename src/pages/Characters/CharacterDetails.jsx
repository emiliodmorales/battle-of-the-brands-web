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
    <section className="max-w-150 m-[40px_auto] bg-neutral-600 rounded-2xl p-8">
      <section className="flex items-center gap-6 mb-8">
        <img
          src={character.image}
          alt="character"
          className="w-25 h-25 border-[3px] border-red-600 rounded-[50%] object-cover"
        />
        <h1 className="text-[2rem] font-bold">{character.name}</h1>
      </section>
      <section className="mb-8">
        <h2>Character Desciption</h2>

        <section className="grid grid-cols-3 gap-6 mt-4">
          <p className="col-span-2 text-center">{character.description}</p>
          <Link to={"/users/" + character.user_id}>
            <p className="hover:underline">
              {"Creator: " + character.username}
            </p>
          </Link>
          {profile?.id === character.user_id && (
            <Link to="edit">
              <button className="w-full">Edit</button>
            </Link>
          )}
          {token && isFavorite ? (
            <button className="col-start-2" onClick={unfavoriteChar}>
              Unfavorite
            </button>
          ) : (
            <button className="col-start-2" onClick={favoriteChar}>
              Favorite
            </button>
          )}
          {profile?.id === character.user_id && (
            <button onClick={deleteChar}>Delete</button>
          )}
        </section>
      </section>
      <div className="mb-8">
        <h2>Character Stats</h2>

        <section className="grid grid-cols-3 gap-6 mt-4">
          <section className="bg-[#f5f7fa] rounded-lg py-4 px-6 text-center ">
            <p className="text-[2rem] font-bold text-red-600">{character.hp}</p>
            <h3 className="block mt-2 text-[#555] text-[2rem]">HP</h3>
          </section>
          <section className="bg-[#f5f7fa] rounded-lg py-4 px-6 text-center ">
            <p className="text-[2rem] font-bold text-red-600">
              {character.attack}
            </p>
            <h3 className="block mt-2 text-[#555] text-[2rem]">ATK</h3>
          </section>
          <section className="bg-[#f5f7fa] rounded-lg py-4 px-6 text-center ">
            <p className="text-[2rem] font-bold text-red-600">
              {character.defense}
            </p>
            <h3 className="block mt-2 text-[#555] text-[2rem]">DEF</h3>
          </section>
          <section className="bg-[#f5f7fa] rounded-lg py-4 px-6 text-center col-span-full">
            <p className="text-[2rem] font-bold text-red-600">
              {character.ability_name || "No Ability"}
            </p>
            <h3 className="block mt-2 text-[#555] text-[2rem]">Ability</h3>
          </section>
        </section>
      </div>
      {history && (
        <div className="mb-8">
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
