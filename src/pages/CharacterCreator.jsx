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
    if (points > 0) throw Error("You have unused points");
    if (points < 0) throw Error("Cannot have negative points");

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

    await createCharacter(charData, token);
  };

  const calculatePoints = async (e) => {
    const formData = new FormData(e.target.form);
    const hp = +formData.get("hp");
    const attack = +formData.get("attack");
    const defense = +formData.get("defense");

    const abilityId = +formData.get("ability");
    const ability = abilities.filter((ability) => ability.id === abilityId)[0];
    const abilityCost = ability?.cost ?? 0;

    setPoints(STARTING_POINTS - hp - attack - defense - abilityCost);
  };

  return (
    <section className="character-creator">
      <h1>Character Creator</h1>
      <form
        action={async (formData) => {
          try {
            await submitCharacter(formData);
          } catch (e) {
            setError(e.message);
          }
        }}
        className="char-form"
      >
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
          <input
            type="number"
            name="hp"
            min={0}
            defaultValue={0}
            onChange={calculatePoints}
          />
        </label>
        <label>
          Attack - 1 point
          <input
            type="number"
            name="attack"
            min={0}
            defaultValue={0}
            onChange={calculatePoints}
          />
        </label>
        <label>
          Defense - 1 point
          <input
            type="number"
            name="defense"
            min={0}
            defaultValue={0}
            onChange={calculatePoints}
          />
        </label>
        <label>
          Select Ability
          <select name="ability" onChange={calculatePoints}>
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
