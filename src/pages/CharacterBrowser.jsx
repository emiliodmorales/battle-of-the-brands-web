import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import "../styles/characters.css";
import { Link } from "react-router";
import { getCharacters } from "../api/characters";

export default function CharacterBrowser() {
  const { token, getProfile } = useAuth();
  const [characters, setCharacters] = useState([]);
  const [userCharacters, setUserCharacters] = useState([]);

  useEffect(() => {
    const tryGetCharacters = async () => {
      const retrievedCharacters = await getCharacters();
      setCharacters(retrievedCharacters);
    };
    tryGetCharacters();
  }, []);

  useEffect(() => {
    const tryGetUserCharacters = async () => {
      const profile = await getProfile();
      setUserCharacters(
        characters.filter((char) => char.user_id === profile.id),
      );
    };
    tryGetUserCharacters();
  }, [characters]);

  if (characters.length === 0) return <p>Loading characters...</p>;

  return (
    <section className="character-browser">
      <h1>Characters</h1>
      <Link to="new">New Character</Link>
      {token && (
        <section className="user-characters">
          <h2>Your Characters</h2>
          <ul>{userCharacters.map(CharacterItem)}</ul>
        </section>
      )}
      <section className="all-characters">
        <h2>All Characters</h2>
        <ul>{characters.map(CharacterItem)}</ul>
      </section>
    </section>
  );
}

function CharacterItem(character) {
  return (
    <li key={character.id}>
      <Link to={"/characters/" + character.id} className="char-item">
        <h3>{character.name}</h3>
        {character.username && (
          <p className="char-user">Owner: {character.username}</p>
        )}
        {character.image && character.image !== "" && (
          <img
            className="char-img"
            alt={"image of " + character.name}
            src={character.image}
          />
        )}
        <p className="char-desc">{character.description}</p>
        <p className="char-hp">{character.hp} HP</p>
        <p className="char-atk">{character.attack} ATK</p>
        <p className="char-def">{character.defense} DEF</p>
        <p className="char-ability">
          {character.ability_name
            ? `Ability: ${character.ability_name}`
            : "No Ability"}
        </p>
      </Link>
    </li>
  );
}
