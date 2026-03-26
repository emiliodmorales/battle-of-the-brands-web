import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createTeam } from "../../api/teams";
import { useAuth } from "../../auth/AuthContext";
import { getCharacters } from "../../api/characters";
import Select from "react-select";

const LABEL_STYLE =
  "flex flex-col text-left font-semibold text-[0.9rem] mb-4 text-[#333]";
const INPUT_STYLE =
  "mt-[0.3rem] p-[0.7rem] border border-[#ccc] rounded-md font-[1rem] bg-[#f9f9f9]";

export default function TeamBuilder() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [charOptions, setCharOptions] = useState([]);

  useEffect(() => {
    const tryGetCharacters = async () => {
      const characters = await getCharacters();
      const newCharOptions = characters.map((char) => {
        return { value: char.id, label: char.name };
      });
      setCharOptions(newCharOptions);
    };
    tryGetCharacters();
  }, []);

  const tryCreateTeam = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const name = formData.get("name");

      const pos1 = formData.get("pos1");
      if (!pos1) throw Error("Missing 1st character");

      const pos2 = formData.get("pos2");
      if (!pos2) throw Error("Missing 2nd character");

      const pos3 = formData.get("pos3");
      if (!pos3) throw Error("Missing 3rd character");

      const pos4 = formData.get("pos4");
      if (!pos4) throw Error("Missing 4th character");

      const pos5 = formData.get("pos5");
      if (!pos5) throw Error("Missing 5th character");

      const selection = [pos1, pos2, pos3, pos4, pos5];
      const selectionSet = new Set(selection);
      if (selection.length !== selectionSet.size)
        throw Error("Duplicate character");

      const team = await createTeam({ name, characterIds: selection }, token);
      navigate("/teams/" + team.id);
    } catch (err) {
      setError(err.message || "Failed to create team.");
    }
  };

  return (
    <div className="grid place-items-center h-full">
      <div className="bg-[#f9f9f9] p-10 rounded-xl container max-w-100 text-center font-[papyrus] shadow-[0_4px_12px_#0000001A]">
        <h1 className="mb-6 text-[1.8rem] text-[#333]">Team Builder</h1>
        <form onSubmit={tryCreateTeam} className="flex flex-col">
          <label className={LABEL_STYLE}>
            Team Name:
            <input
              className={INPUT_STYLE}
              type="text"
              name="name"
              placeholder="Enter team name"
              required
            />
          </label>
          <label className={LABEL_STYLE}>
            1st Position:
            <Select
              name="pos1"
              placeholder="Select a character"
              options={charOptions}
            />
          </label>
          <label className={LABEL_STYLE}>
            2nd Position:
            <Select
              name="pos2"
              placeholder="Select a character"
              options={charOptions}
            />
          </label>
          <label className={LABEL_STYLE}>
            3rd Position:
            <Select
              name="pos3"
              placeholder="Select a character"
              options={charOptions}
            />
          </label>
          <label className={LABEL_STYLE}>
            4th Position:
            <Select
              name="pos4"
              placeholder="Select a character"
              options={charOptions}
            />
          </label>
          <label className={LABEL_STYLE}>
            5th Position:
            <Select
              name="pos5"
              placeholder="Select a character"
              options={charOptions}
            />
          </label>
          {error && <p className="text-red-600 mb-2">{error}</p>}
          <button>Save Team</button>
        </form>
      </div>
    </div>
  );
}
