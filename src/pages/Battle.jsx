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

  // function not complete but its for stopping fights and reseting the screen, also recording win++
  const stop = () => {
    setIsFighting(false);
    setCountdown(COUNTDOWN_TIME);
  };

  return (
    <div className="battleBackground">
      <h1>
        Get ready to <span className="vertical-shake">rumble</span>
      </h1>
      {/* No styling change but left in case we want to change the box when the fight starts */}
      <div className={`battleBox${isFighting ? "Fighting" : ""}`}>
        <p className="challenger">Challenger</p>
        <div className="challenger">
          {challenger.map((character) => (
            <p key={character.character_id}>
              <span className={`${isFighting ? "charge" : ""}`}>
                {character.name}
              </span>
            </p>
          ))}
        </div>

        <p className="defender">Defender</p>
        <div className={`defender${isFighting ? "Revealed" : "Hidden"}`}>
          {isFighting ? (
            defender.map((character) => (
              <p key={character.character_id}>
                <span className={`${isFighting ? "charge" : ""}`}>
                  {character.name}
                </span>
              </p>
            ))
          ) : (
            <div>❔</div>
          )}
        </div>

        <p className="sword">
          {isFighting ? "" : isCounting ? countdown : "⚔️"}
        </p>

        <button onClick={toggleFighting} disabled={isCounting}>
          FIGHT!
        </button>
      </div>
    </div>
  );
}

// Questions to ask

// setinterval vs setTimeout
// Avoid stacking intervals and recommended for countdown

// Changing
// const timer = setInterval(() => setCountdown(countdown - 1), 1000);
// to
// const timer = setInterval(() => {setCountdown((prev) => prev - 1);}, 1000);
// because stale state bugs are captured from render when effect is ran?
