import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCharacters } from "../api/characters";
import { createTeam } from "../api/teams";
import { useAuth } from "../auth/AuthContext"
import { getCharacters } from "../api/characters";

export default function TeamBuilder({ availableCharacters }) {
  const [teamName, setTeamName] = useState("");
  const [selected, setSelected] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const data = await getCharacters();
        setCharacters(data);
        setFiltered(data);
      } catch (err) {
        console.error("Failed to fetch characters:", err);
      }
    }
    if (!availableCharacters) {
      fetchCharacters();
    } else {
      setCharacters(availableCharacters);
      setFiltered(availableCharacters);
    }
  }, [availableCharacters]);

  useEffect(() => {
    setFiltered(
      characters.filter((char) =>
        char.name.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search, characters]);

  const toggleCharacter = (char) => {
    if (selected.includes(char.id)) {
      setSelected(selected.filter((id) => id !== char.id));
    } else if (selected.length < 5) {
      setSelected([...selected, char.id]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (selected.length !== 5 || !teamName.trim()) return;
    try {
      await createTeam({ name: teamName, characterIds: selected }, token);
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Failed to create team.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="team-builder">
      <label>
        Team Name:
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Enter team name"
        />
      </label>
      <div className="my-4">
        <input
          type="text"
          placeholder="Search characters..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <h3>Select 5 Characters:</h3>
        <ul className="character-list">
          {filtered.map((char) => (
            <li
              key={char.id}
              className={selected.includes(char.id) ? "selected" : ""}
              onClick={() => toggleCharacter(char)}
              style={{
                cursor: "pointer",
                fontWeight: selected.includes(char.id) ? "bold" : "normal",
              }}
            >
              {char.name}
            </li>
          ))}
        </ul>
        <div>{selected.length}/5 selected</div>
      </div>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <button
        type="submit"
        disabled={selected.length !== 5 || !teamName.trim()}
      >
        Save Team
      </button>
    </form>
  );
}
