import { useEffect, useState } from "react";
import { getAbilities } from "../api/abilities";
import { useAuth } from "../auth/AuthContext";
import "../styles/characters.css";
import { createCharacter } from "../api/characters";

const STARTING_POINTS = 25;

export default function CharacterCreator() {
  const { token } = useAuth();
  const [points, setPoints] = useState(STARTING_POINTS);
  const [abilities, setAbilities] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const tryGetAbilities = async () => {
      const retrievedAbilities = await getAbilities();
      setAbilities(retrievedAbilities);
    };
    tryGetAbilities();
  }, []);

  const submitCharacter = async (formData) => {
    const name = formData.get("name");
    const description = formData.get("description");
    const image = formData.get("image");
    const hp = formData.get("hp");
    const attack = formData.get("attack");
    const defense = formData.get("defense");
    const abilityId = formData.get("ability");
    const charData = {
      name,
      description,
      image,
      hp,
      attack,
      defense,
      abilityId,
    };

    try {
      await createCharacter(charData, token);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <section className="character-creator">
      <h1>Character Creator</h1>
      <form action={submitCharacter} className="char-form">
        <label>
          Character Name
          <input type="text" name="name" />
        </label>
        <label>
          Description
          <input type="text" name="description" />
        </label>
        <label>
          Image
          <input type="text" name="image" />
        </label>
        <p>{points} Points</p>
        <label>
          HP - 1 point
          <input type="number" name="hp" />
        </label>
        <label>
          Attack - 1 point
          <input type="number" name="attack" />
        </label>
        <label>
          Defense - 1 point
          <input type="number" name="defense" />
        </label>
        <label>
          Select Ability
          <select>
            <option value="none">None</option>
            {abilities.map((ability) => (
              <option key={ability.id} value={ability.id}>
                {ability.name}
              </option>
            ))}
          </select>
        </label>
        {error && <p role="alert">{error}</p>}
        <button>Create</button>
      </form>
      <section className="ability-list">
        <h2>Abilities</h2>
        <ul>
          {abilities.map((ability) => (
            <li key={ability.id}>
              <h3>
                {ability.name} - {ability.cost} point(s)
              </h3>
              <p>{ability.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
