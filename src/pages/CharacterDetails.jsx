import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router";
import { deleteCharacter, getCharacterDetails } from "../api/characters";
import { useAuth } from "../auth/AuthContext";

export default function CharacterDetails() {
  const { token } = useAuth();
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

  const deleteChar = async () => {
    await deleteCharacter(token, character.id);
  };

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
      <p>
        Owner:
        <Link to={"/users/" + character.user_id}>{character.username}</Link>
      </p>
      {token && <Link to="edit">Edit</Link>}
      {token && <button onClick={deleteChar}>Delete</button>}
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
