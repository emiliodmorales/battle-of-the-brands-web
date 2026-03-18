import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function CharacterBrowser() {
  const { token } = useAuth();
  const [characters, setCharacters] = useState();
  const [userCharacters, setUserCharacters] = useState();

  useEffect(() => {
    const tryGetCharacters = async () => {
      setCharacters([
        {
          id: 1,
          user_id: 1,
          name: "Pikachu",
          description: "electric mouse",
          image: "",
          hp: 5,
          attack: 10,
          defense: 2,
          ability_id: null,
        },
        {
          id: 2,
          user_id: 1,
          name: "Charizard",
          description: "fire lizard",
          image: "",
          hp: 5,
          attack: 10,
          defense: 2,
          ability_id: null,
        },
        {
          id: 3,
          user_id: 1,
          name: "Bulbasaur",
          description: "grass lover",
          image: "",
          hp: 5,
          attack: 10,
          defense: 2,
          ability_id: null,
        },
        {
          id: 4,
          user_id: 1,
          name: "Geodude",
          description: "floating rocks",
          image: "",
          hp: 5,
          attack: 10,
          defense: 2,
          ability_id: null,
        },
        {
          id: 5,
          user_id: 1,
          name: "Beedrill",
          description: "big bee",
          image: "",
          hp: 5,
          attack: 10,
          defense: 2,
          ability_id: null,
        },
        {
          id: 6,
          user_id: 2,
          name: "Agumon",
          description: "little trex",
          image: "",
          hp: 5,
          attack: 10,
          defense: 2,
          ability_id: null,
        },
        {
          id: 7,
          user_id: 2,
          name: "Numemon",
          description: "slug",
          image: "",
          hp: 5,
          attack: 10,
          defense: 2,
          ability_id: null,
        },
        {
          id: 8,
          user_id: 2,
          name: "Birdramon",
          description: "fire bird",
          image: "",
          hp: 5,
          attack: 10,
          defense: 2,
          ability_id: null,
        },
        {
          id: 9,
          user_id: 2,
          name: "Monzaemon",
          description: "teddy bear",
          image: "",
          hp: 5,
          attack: 10,
          defense: 2,
          ability_id: null,
        },
        {
          id: 10,
          user_id: 2,
          name: "Vegiemon",
          description: "plant",
          image: "",
          hp: 5,
          attack: 10,
          defense: 2,
          ability_id: null,
        },
      ]);
    };
    tryGetCharacters();
  }, []);

  useEffect(() => {
    const tryGetUserCharacters = async () => {
      setUserCharacters([
        {
          id: 1,
          user_id: 1,
          name: "Pikachu",
          description: "electric mouse",
          image: "",
          hp: 5,
          attack: 10,
          defense: 2,
          ability_id: null,
        },
        {
          id: 2,
          user_id: 1,
          name: "Charizard",
          description: "fire lizard",
          image: "",
          hp: 5,
          attack: 10,
          defense: 2,
          ability_id: null,
        },
        {
          id: 3,
          user_id: 1,
          name: "Bulbasaur",
          description: "grass lover",
          image: "",
          hp: 5,
          attack: 10,
          defense: 2,
          ability_id: null,
        },
        {
          id: 4,
          user_id: 1,
          name: "Geodude",
          description: "floating rocks",
          image: "",
          hp: 5,
          attack: 10,
          defense: 2,
          ability_id: null,
        },
        {
          id: 5,
          user_id: 1,
          name: "Beedrill",
          description: "big bee",
          image: "",
          hp: 5,
          attack: 10,
          defense: 2,
          ability_id: null,
        },
      ]);
    };
    tryGetUserCharacters();
  }, []);

  if (!characters) return <p>Loading characters...</p>;

  return (
    <section className="character-browser">
      <h1>Characters</h1>
      {token && (
        <section className="user-characters">
          <h2>Your Characters</h2>
          <ul>{userCharacters.map(CharacterItem)}</ul>
        </section>
      )}
      <section className="all-characters">
        <h2>All Characters</h2>
        <ul>{characters.map(CharacterItem)}</ul>
      </section>
    </section>
  );
}

function CharacterItem(character) {
  return <p>{character.name}</p>;
}
