import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { Link, useSearchParams } from "react-router";
import { getCharacters, getFavoriteCharacters } from "../../api/characters";

export default function CharacterBrowser() {
  const { token, profile } = useAuth();
  const [characters, setCharacters] = useState([]);
  const [userCharacters, setUserCharacters] = useState([]);
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get("search");
  const [faveCharacters, setFaveCharacters] = useState([]);

  useEffect(() => {
    const tryGetCharacters = async () => {
      const retrievedCharacters = await getCharacters();
      setCharacters(retrievedCharacters);
    };
    tryGetCharacters();
  }, []);

  useEffect(() => {
    const tryGetUserCharacters = async () => {
      if (!profile) return;
      setUserCharacters(
        characters.filter((char) => char.user_id === profile.id),
      );
    };
    tryGetUserCharacters();
  }, [characters, profile]);

  useEffect(() => {
    const tryGetFaveCharacters = async () => {
      if (!token) return;
      const retrievedCharacters = await getFavoriteCharacters(token);
      setFaveCharacters(retrievedCharacters);
    };
    tryGetFaveCharacters();
  }, [token]);

  if (characters.length === 0) return <p>Loading characters...</p>;

  return (
    <section className="p-[1em] flex flex-col gap-[1em]">
      <h1 className="text-3xl">Characters</h1>
      <form>
        <search className="grid grid-cols-[90%_1fr] gap-[1em]">
          <input
            className="border border-white rounded-md p-1"
            type="text"
            name="search"
            defaultValue={searchText}
          />
          <button>Search</button>
        </search>
      </form>
      {searchText && searchText !== "" && (
        <section>
          <h2 className="text-xl">Search Results</h2>
          <ul className="overflowScroll">
            {characters
              .filter(
                (char) =>
                  char.name.toLowerCase().includes(searchText.toLowerCase()) ||
                  char.description
                    .toLowerCase()
                    .includes(searchText.toLowerCase()),
              )
              .map(CharacterItem)}
          </ul>
        </section>
      )}
      {token && userCharacters.length > 0 && (
        <section>
          <h2 className="text-xl">Your Characters</h2>
          <ul className="overflowScroll">
            {userCharacters.map(CharacterItem)}
          </ul>
        </section>
      )}
      {token && faveCharacters.length > 0 && (
        <section>
          <h2 className="text-xl">Favorite Characters</h2>
          <ul className="overflowScroll">
            {faveCharacters.map(CharacterItem)}
          </ul>
        </section>
      )}
      <section>
        <h2 className="text-xl">All Characters</h2>
        <ul className="overflowScroll">{characters.map(CharacterItem)}</ul>
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
          {character.ability_name || "No Ability"}
        </p>
      </Link>
    </li>
  );
}
