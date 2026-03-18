import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";

export default function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState();

  useEffect(() => {
    const tryGetCharacter = async () => {
      setCharacter({
        id: 1,
        user_id: 1,
        name: "Pikachu",
        description: "electric mouse",
        image: "https://img.pokemondb.net/artwork/large/pikachu.jpg",
        hp: 5,
        attack: 10,
        defense: 2,
        ability_id: null,
        ability_name: "Thorn",
        username: "Ash",
      });
    };
    tryGetCharacter();
  }, []);

  if (!character) return <p>Loading character details...</p>;

  return (
    <section className="character-details">
      <h1>{character.name}</h1>
      <img
        style={{ maxHeight: "200px", maxWidth: "200px" }}
        alt={"image of " + character.name}
        src={character.image}
      />
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
