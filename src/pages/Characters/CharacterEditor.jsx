import { useEffect, useState } from "react";
import { getAbilities } from "../../api/abilities";
import { useAuth } from "../../auth/AuthContext";
import { uploadImage } from "../../api/images";
import { useNavigate, useParams } from "react-router";
import { getCharacterDetails, updateCharacter } from "../../api/characters";

const STARTING_POINTS = 25;
const LABEL_STYLE =
  "flex flex-col text-left font-semibold text-[0.9rem] mb-4 text-[#333]";
const INPUT_STYLE =
  "mt-[0.3rem] p-[0.7rem] border border-[#ccc] rounded-md font-[1rem] bg-[#f9f9f9]";

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

      const { hp, attack, defense, ability_id } = retrievedCharacter;
      const ability = abilities.filter(
        (ability) => ability.id === ability_id,
      )[0];
      const abilityCost = ability?.cost ?? 0;
      setPoints(STARTING_POINTS - hp - attack - defense - abilityCost);
    };
    tryGetCharacter();
  }, [abilities]);

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
    <div className="grid grid-cols-2 place-items-center h-full">
      <div className="bg-[#f9f9f9] p-10 rounded-xl container max-w-100 text-center font-[papyrus] shadow-[0_4px_12px_#0000001A]">
        <h1 className="mb-6 text-[1.8rem] text-[#333]">Character Editor</h1>
        <form
          className="grid overflow-scroll max-h-150"
          action={async (formData) => {
            try {
              await submitCharacter(formData);
            } catch (e) {
              setError(e.message);
            }
          }}
        >
          <label className={LABEL_STYLE}>
            Character Name
            <input
              className={INPUT_STYLE}
              type="text"
              name="name"
              defaultValue={character.name}
            />
          </label>
          <label className={LABEL_STYLE}>
            Description
            <input
              className={INPUT_STYLE}
              type="text"
              name="description"
              defaultValue={character.description}
            />
          </label>
          <label className={LABEL_STYLE}>
            Image
            <img
              className="max-w-[12em] max-h-[12em]"
              alt={"old image of " + character.name}
              src={character.image}
            />
            <input
              className={INPUT_STYLE}
              type="file"
              name="image"
              accept="image/*"
            />
          </label>
          <p className={LABEL_STYLE}>{points} Points</p>
          <label className={LABEL_STYLE}>
            HP - 1 point
            <input
              className={INPUT_STYLE}
              type="number"
              name="hp"
              min={0}
              defaultValue={character.hp}
              onChange={calculatePoints}
            />
          </label>
          <label className={LABEL_STYLE}>
            Attack - 1 point
            <input
              className={INPUT_STYLE}
              type="number"
              name="attack"
              min={0}
              defaultValue={character.attack}
              onChange={calculatePoints}
            />
          </label>
          <label className={LABEL_STYLE}>
            Defense - 1 point
            <input
              className={INPUT_STYLE}
              type="number"
              name="defense"
              min={0}
              defaultValue={character.defense}
              onChange={calculatePoints}
            />
          </label>
          <label className={LABEL_STYLE}>
            Select Ability
            <select
              className={INPUT_STYLE}
              name="ability"
              onChange={calculatePoints}
            >
              {abilities
                .concat([{ id: null, name: "None" }])
                .sort((a, b) =>
                  a.id === character.ability_id
                    ? -1
                    : b.id === character.ability_id
                      ? 1
                      : 0,
                )
                .map((ability) => (
                  <option key={ability.id} value={ability.id}>
                    {ability.name}
                  </option>
                ))}
            </select>
          </label>
          {error && <p role="alert">{error}</p>}
          <button>Update</button>
        </form>
      </div>
      <div className="p-10 rounded-xl container text-center font-[papyrus] shadow-[0_4px_12px_#0000001A]">
        <h2 className="mb-6 text-[1.8rem]">Abilities</h2>
        <ul className="grid grid-cols-2 gap-1">
          {abilities.map((ability) => (
            <li key={ability.id} className={INPUT_STYLE}>
              <h3 className={LABEL_STYLE}>
                {ability.name} - {ability.cost} point(s)
              </h3>
              <p className={LABEL_STYLE}>{ability.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
