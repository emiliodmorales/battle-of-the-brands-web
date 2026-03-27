import { useEffect, useState } from "react";
import FighterDetails from "./BattleInfo/FighterDetails";
import CombatTeamSearch from "./BattleInfo/CombatTeamSearch";
import { getTeamById } from "../../api/teams";
import Combat from "./Combat";

const COUNTDOWN_TIME = 3;

export default function Battle() {
  const [isFighting, setIsFighting] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_TIME);
  const [isCounting, setIsCounting] = useState(false);
  const [challengerTeam, setChallengerTeam] = useState(null);
  const [defenderTeam, setdefenderTeam] = useState(null);

  const selectChallengerTeam = async (teamId) => {
    const team = await getTeamById(teamId);
    if (!team) {
      return;
    }
    setChallengerTeam(team);
  };

  const selectDefenderTeam = async (teamId) => {
    const team = await getTeamById(teamId);
    if (!team) {
      return;
    }
    setdefenderTeam(team);
  };

  // Fix this later to select random team
  const startBattle = () => {
    if (!defenderTeam) {
      selectDefenderTeam(2);
    }
    toggleFighting();
  };

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
    <>
      <div className="flex flex-col justify-center items-center p-6">
        <h1 className="font-[papyrus] uppercase">
          Get ready to{" "}
          <span className="inline-block animate-verticalShake">rumble</span>
        </h1>
        <div className="grid grid-cols-3 grid-rows-[1fr_6fr_2fr] bg-[#808080] w-[80vw] min-w-[20vw] max-h-[60vh] min-h-[15vh]">
          <p className="col-start-1 place-self-center">Challenger</p>
          <ul className="row-[2/4] grid grid-cols-3 grid-rows-auto list-none place-self-center ml-2 ">
            <li
              className={`col-span-full mb-2 ${isCounting || isFighting ? "hidden" : ""}`}
            >
              <CombatTeamSearch onTeamSelect={selectChallengerTeam} />
            </li>
            {challengerTeam?.characters.map((character) => (
              <li key={character.id}>
                <span
                  className={`${isFighting ? "inline-block animate-challengerCharge" : ""}`}
                >
                  <FighterDetails characterId={character.id} />
                </span>
              </li>
            ))}
          </ul>

          <p className="col-start-3 row-start-1 place-self-center">Defender</p>
          <ul className="col-start-3 row-[2/4] grid grid-cols-3 grid-rows-auto list-none place-self-center ml-2">
            {isFighting ? (
              defenderTeam?.characters.map((character) => (
                <li key={character.id}>
                  <span className="inline-block animate-defenderCharge">
                    <FighterDetails characterId={character.id} />
                  </span>
                </li>
              ))
            ) : (
              <div className="text-[9rem]">❔</div>
            )}
          </ul>

          <p className="row-[1/3] place-self-center text-[clamp(2rem,20vmin,9rem)]">
            {isFighting ? "" : isCounting ? countdown : "⚔️"}
          </p>

          {/* Need to add error when you try to start combat but don't have a challenger team selected */}
          <button
            className={`col-start-2 row-start-3 bg-neutral-400 border border-black rounded-md
          h-[60%] w-[90%] place-self-center text-[clamp(0.8rem,1.5vw,1.5rem)]
          ${isCounting ? "disabled opacity-50" : isFighting ? "hidden" : "hover"}`}
            onClick={startBattle}
          >
            FIGHT!
          </button>
        </div>
      </div>
      {/* isFigting is neccessary so it won't try to render until button is pressed can remove challengerTeam,
      defenderTeam once me make it impossible to start combat. Or leave it just in case */}
      {isFighting && challengerTeam && defenderTeam && (
        <section className={`${!isFighting ? "hidden" : ""} place-self-center`}>
          <Combat challengerTeam={challengerTeam} defenderTeam={defenderTeam} />
        </section>
      )}
    </>
  );
}
