import { useEffect, useState } from "react";
import FighterDetails from "./FighterDetails";

// Dummy Data
// For the two teams fighting
const challenger = [
  { team_id: 1, character_id: 10, position: 1, name: "Knight" },
  { team_id: 1, character_id: 8, position: 2, name: "Mage" },
  { team_id: 1, character_id: 2, position: 3, name: "Rouge" },
  { team_id: 1, character_id: 7, position: 4, name: "Priest" },
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
    <div className="flex flex-col justify-center items-center p-6">
      <h1 className="font-[papyrus] uppercase">
        Get ready to{" "}
        <span className="inline-block animate-verticalShake">rumble</span>
      </h1>
      <div className="grid grid-cols-3 grid-rows-[1fr_6fr_2fr] bg-[#808080] w-[80vw] min-w-[20vw] max-h-[60vh] min-h-[15vh]">
        <p className="col-start-1 place-self-center">Challenger</p>
        <ul className="row-[2/4] flex flex-row-reverse place-self-center">
          {challenger.map((character) => (
            <li className="list-none w-1/3" key={character.character_id}>
              <span
                className={`${isFighting ? "inline-block animate-challengerCharge" : ""}`}
              >
                <FighterDetails characterId={character.character_id} />
              </span>
            </li>
          ))}
        </ul>

        <p className="col-start-3 row-start-1 place-self-center">Defender</p>
        <ul
          className={`col-start-3 row-[2/4] flex flex-row place-self-center ${isFighting ? "" : "text-[9rem]"}`}
        >
          {isFighting ? (
            defender.map((character) => (
              <li className="list-none" key={character.character_id}>
                <span className="inline-block animate-defenderCharge">
                  <FighterDetails characterId={character.character_id} />
                </span>
              </li>
            ))
          ) : (
            <div>❔</div>
          )}
        </ul>

        <p className="row-[1/3] place-self-center text-[clamp(2rem,20vmin,9rem)]">
          {isFighting ? "" : isCounting ? countdown : "⚔️"}
        </p>

        <button
          className={`col-start-2 row-start-3 bg-neutral-400 border border-black rounded-md
          h-[60%] w-[90%] place-self-center text-[clamp(0.8rem,1.5vw,1.5rem)]
          ${isCounting ? "disabled opacity-50" : isFighting ? "hidden" : "hover"}`}
          onClick={toggleFighting}
        >
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
