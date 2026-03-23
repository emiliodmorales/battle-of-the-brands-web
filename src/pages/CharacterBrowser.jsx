import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
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
    <section className="p-[1em] flex flex-col gap-[1em]">
      <h1>Characters</h1>
      <Link to="new">New Character</Link>
      {token && (
        <section>
          <h2>Your Characters</h2>
          <ul className="list-none overflow-x-scroll flex gap-4">
            {userCharacters.map(CharacterItem)}
          </ul>
        </section>
      )}
      <section>
        <h2>All Characters</h2>
        <ul className="list-none overflow-x-scroll flex gap-4">
          {characters.map(CharacterItem)}
        </ul>
      </section>
    </section>
  );
}

function CharacterItem(character) {
  return (
    <li key={character.id}>
      <Link to={"/characters/" + character.id} className="char">
        <h3 className="row-[1/2] col-[1/3]">{character.name}</h3>
        {character.username && (
          <p className="row-[1/2] col-[3/4]">Owner: {character.username}</p>
        )}
        {character.image && character.image !== "" && (
          <img
            className="max-w-[12em] max-h-[12em] row-[2/3] col-[1/4]"
            alt={"image of " + character.name}
            src={character.image}
          />
        )}
        <p className="row-[3/4] col-[1/3]">{character.description}</p>
        <p className="row-[3/4] col-[3/4]">{character.hp} HP</p>
        <p className="row-[4/5] col-[1/2]">{character.attack} ATK</p>
        <p className="row-[4/5] col-[2/3]">{character.defense} DEF</p>
        <p className="row-[4/5] col-[3/4]">
          {character.ability_name
            ? `Ability: ${character.ability_name}`
            : "No Ability"}
        </p>
      </Link>
    </li>
  );
}
