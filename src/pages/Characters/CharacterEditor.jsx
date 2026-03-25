import { useEffect, useState } from "react";
import { getAbilities } from "../../api/abilities";
import { useAuth } from "../../auth/AuthContext";
import { uploadImage } from "../../api/images";
import { useNavigate, useParams } from "react-router";
import { getCharacterDetails, updateCharacter } from "../../api/characters";

const STARTING_POINTS = 25;

export default function CharacterEditor() {
  const { id } = useParams();
  const [character, setCharacter] = useState();

  const navigate = useNavigate();
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

  useEffect(() => {
    const tryGetCharacter = async () => {
      const retrievedCharacter = await getCharacterDetails(id);
      setCharacter(retrievedCharacter);
    };
    tryGetCharacter();
  }, []);

  const submitCharacter = async (formData) => {
    if (points > 0) throw Error("You have unused points");
    if (points < 0) throw Error("Cannot have negative points");

    const name = formData.get("name");
    const description = formData.get("description");
    const hp = formData.get("hp");
    const attack = formData.get("attack");
    const defense = formData.get("defense");
    const ability = formData.get("ability");
    const abilityId = ability === "None" ? null : ability;

    const imageFile = formData.get("image");
    const image =
      imageFile.size === 0 ? character.image : await uploadImage(imageFile);

    const charData = {
      name,
      description,
      image,
      hp,
      attack,
      defense,
      abilityId,
    };

    await updateCharacter(charData, token, id);
    navigate("/characters/" + character.id);
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

  if (!character) return <p>Loading character...</p>;

  return (
    <section className="char-creator grid grid-cols-2 gap-[2em] p-[2em]">
      <h1 className="col-[1/3]">Character Editor</h1>
      <form
        className="grid"
        action={async (formData) => {
          try {
            await submitCharacter(formData);
          } catch (e) {
            setError(e.message);
          }
        }}
      >
        <label>
          Character Name
          <input
            className="border border-white rounded-md"
            type="text"
            name="name"
            defaultValue={character.name}
          />
        </label>
        <label>
          Description
          <input
            className="border border-white rounded-md"
            type="text"
            name="description"
            defaultValue={character.description}
          />
        </label>
        <label>
          Image
          <img
            className="max-w-[12em] max-h-[12em]"
            alt={"old image of " + character.name}
            src={character.image}
          />
          <input type="file" name="image" accept="image/*" />
        </label>
        <p>{points} Points</p>
        <label>
          HP - 1 point
          <input
            className="border border-white rounded-md"
            type="number"
            name="hp"
            min={0}
            defaultValue={character.hp}
            onChange={calculatePoints}
          />
        </label>
        <label>
          Attack - 1 point
          <input
            className="border border-white rounded-md"
            type="number"
            name="attack"
            min={0}
            defaultValue={character.attack}
            onChange={calculatePoints}
          />
        </label>
        <label>
          Defense - 1 point
          <input
            className="border border-white rounded-md"
            type="number"
            name="defense"
            min={0}
            defaultValue={character.defense}
            onChange={calculatePoints}
          />
        </label>
        <label>
          Select Ability
          <select
            className="border border-white rounded-md"
            name="ability"
            onChange={calculatePoints}
          >
            <option value={null}>None</option>
            {abilities.map((ability) => (
              <option key={ability.id} value={ability.id}>
                {ability.name}
              </option>
            ))}
          </select>
        </label>
        {error && <p role="alert">{error}</p>}
        <button>Update</button>
      </form>
      <section>
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
