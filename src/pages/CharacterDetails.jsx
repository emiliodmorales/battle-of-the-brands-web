import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { getCharacterDetails } from "../api/characters";

export default function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState();

  useEffect(() => {
    const tryGetCharacter = async () => {
      const retrievedCharacter = await getCharacterDetails(id);
      setCharacter(retrievedCharacter);
    };
    tryGetCharacter();
  }, []);

  if (!character) return <p>Loading character details...</p>;

  return (
    <section className="character-details">
      <h1>{character.name}</h1>
      {character.image && character.image !== "" && (
        <img
          style={{ maxHeight: "200px", maxWidth: "200px" }}
          alt={"image of " + character.name}
          src={character.image}
        />
      )}
      <p>{character.description}</p>
      <p>Owner: {character.username}</p>
      <section className="char-stats">
        <h2>Character Stats</h2>
        <p>{character.hp} HP</p>
        <p>{character.attack} ATK</p>
        <p>{character.defense} DEF</p>
      </section>
      <p>
        {character.ability_name
          ? `Ability: ${character.ability_name}`
          : "No Ability"}
      </p>
    </section>
  );
}
