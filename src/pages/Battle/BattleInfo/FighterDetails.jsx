import { useEffect, useState } from "react";
import { getCharacterDetails } from "../../../api/characters";

export default function FighterDetails({ characterId }) {
  const [fighter, setFighter] = useState();

  useEffect(() => {
    const tryGetCharacter = async () => {
      const retrievedCharacter = await getCharacterDetails(characterId);
      setFighter(retrievedCharacter);
    };
    tryGetCharacter();
  }, [characterId]);

  if (!fighter) return <p>Loading fighter details...</p>;

  return (
    <>
      <img
        className="flex flex-wrap max-w-[6em] max-h-[6em]"
        src={fighter.image}
        alt={fighter.name}
      />
      <div>{fighter.name}</div>
    </>
  );
}

/*To check on what Id i'm recieving */
/*
console.log("characterId:", characterId, typeof characterId);
*/
