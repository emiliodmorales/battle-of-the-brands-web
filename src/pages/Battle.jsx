import { useEffect, useState } from "react";
import "../battle.css";

// Dummy Data
// For the two teams fighting
const challenger = [
  { team_id: 1, character_id: 10, position: 1, name: "Knight" },
  { team_id: 1, character_id: 12, position: 2, name: "Mage" },
  { team_id: 1, character_id: 2, position: 3, name: "Rouge" },
  { team_id: 1, character_id: 15, position: 4, name: "Priest" },
  { team_id: 1, character_id: 6, position: 5, name: "Hunter" },
];

const defender = [
  { team_id: 2, character_id: 6, position: 1, name: "Hunter" },
  { team_id: 2, character_id: 15, position: 2, name: "Priest" },
  { team_id: 2, character_id: 7, position: 3, name: "Palladin" },
  { team_id: 2, character_id: 8, position: 4, name: "Bard" },
  { team_id: 2, character_id: 1, position: 5, name: "Hero" },
];

// Might want to import useState and other functions into a GameContext if there's a lot

const COUNTDOWN_TIME = 3;

export default function Battle() {
  const [isFighting, setIsFighting] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_TIME);
  const [isCounting, setIsCounting] = useState(false);

  const toggleFighting = () => {
    setCountdown(3);
    setIsCounting(true);
  };

  useEffect(() => {
    if (!isCounting) return;

    if (countdown === 0) {
      setIsFighting(true);
      setIsCounting(false);
      return;
    }

    const timer = setInterval(() => setCountdown(countdown - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown, isCounting]);

  // function not complete but it stops fighting and resets the screen, also record win++
  const stop = () => {
    setIsFighting(false);
  };

  return (
    <div className="battleBackground">
      <h1>
        Get ready to <span className="vertical-shake">rumble</span>
      </h1>
      <div className={`battleBox${isFighting ? "Fighting" : ""}`}>
        <div className="challenger">
          {challenger.map((character) => (
            <p key={character.character_id}>{character.name}</p>
          ))}
        </div>
        <p className="challenger">Challenger</p>
        <p className="sword">⚔️</p>

        <p className="defender">Defender</p>
        <div className={`defender${isFighting ? "Revealed" : "Hidden"}`}>
          {isFighting ? (
            defender.map((character) => (
              <p key={character.character_id}>{character.name}</p>
            ))
          ) : (
            <div>❔</div>
          )}
        </div>

        <button onClick={toggleFighting} disabled={isCounting}>
          FIGHT!
        </button>
      </div>
    </div>
  );
}
