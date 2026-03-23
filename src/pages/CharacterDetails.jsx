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
} from "../api/characters";
import { useAuth } from "../auth/AuthContext";

export default function CharacterDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, getProfile } = useAuth();
  const [character, setCharacter] = useState();
  const [profile, setProfile] = useState();
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
    const tryGetProfile = async () => {
      const retrievedProfile = await getProfile();
      setProfile(retrievedProfile);
    };
    tryGetProfile();
  }, []);

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
    <section className="character-details">
      <section className="char-info">
        <h1>{character.name}</h1>
        {character.image && character.image !== "" && (
          <img
            className="char-img"
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
          <button>
            <Link to="edit">Edit</Link>
          </button>
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
      <section className="char-stats">
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
      {history && (
        <section className="char-history">
          <h2>Battle History</h2>
          <p>Total Battles: {history.total_battles}</p>
          <p>Wins: {history.wins}</p>
          <h3>Battles</h3>
          <ul>
            {history.battle_history.map((battle, i) => (
              <li key={i}>
                <p>
                  {battle.challenger.name} vs {battle.defender.name}
                </p>
                <p>Winner: {battle.winner.name}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
}
