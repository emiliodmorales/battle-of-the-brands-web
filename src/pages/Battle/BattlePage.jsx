import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import FighterDetails from "./BattleInfo/FighterDetails";
import { getTeams, getTeamById, getRandomTeam } from "../../api/teams";
import Combat from "./Combat";
import Select from "react-select";
import { getUserTeams } from "../../api/users";
import { useAuth } from "../../auth/AuthContext";

const COUNTDOWN_TIME = 3;

export default function Battle() {
  const [isFighting, setIsFighting] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_TIME);
  const [isCounting, setIsCounting] = useState(false);
  const [challengerTeam, setChallengerTeam] = useState(null);
  const [defenderTeam, setdefenderTeam] = useState(null);
  const [teamOptions, setTeamOptions] = useState([]);
  const [opponentOptions, setOpponentOptions] = useState([]);
  const { profile } = useAuth();
  const [searchParams] = useSearchParams();

  const selectChallengerTeam = async (teamId) => {
    const team = await getTeamById(teamId);
    if (!team) {
      return;
    }
    setChallengerTeam(team);
  };

  const selectDefenderTeam = async (teamId) => {
    let team;
    if (teamId) {
      team = await getTeamById(teamId);
    } else {
      const randomTeams = await getRandomTeam();
      team = randomTeams.filter((t) => t.id !== challengerTeam?.id)[0];
    }
    if (!team) return;
    setdefenderTeam(team);
    startBattle();
  };

  // Fix this later to select random team
  const startBattle = () => {
    if (!defenderTeam) {
      selectDefenderTeam();
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

  useEffect(() => {
    const tryGetUserTeams = async () => {
      if (!profile) return;
      const teams = await getUserTeams(profile.id);
      const newTeamOptions = teams.map((team) => {
        return { value: team.id, label: team.name };
      });
      setTeamOptions(newTeamOptions);
    };
    tryGetUserTeams();
  }, [profile]);

  useEffect(() => {
    const tryGetOpponentTeams = async () => {
      try {
        if (!challengerTeam)
          return setOpponentOptions([{ value: null, label: "Random Team" }]);
        const defenderId = Number(searchParams.get("defender"));
        if (defenderId) {
          selectDefenderTeam(defenderId);
        }
        const teams = await getTeams();
        const newTeamOptions = teams
          .filter((team) => team.id !== challengerTeam.id)
          .map((team) => {
            return { value: team.id, label: team.name };
          });
        newTeamOptions.push({ value: null, label: "Random Team" });
        setOpponentOptions(newTeamOptions);
      } catch (e) {
        console.error(e);
      }
    };
    tryGetOpponentTeams();
  }, [challengerTeam]);

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
              <Select
                className="text-black"
                placeholder="Select a team"
                options={teamOptions}
                onChange={(x) => selectChallengerTeam(x.value)}
              />
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
          <ul
            hidden={!challengerTeam}
            className="col-start-3 row-[2/4] grid grid-cols-3 grid-rows-auto list-none place-self-center ml-2"
          >
            {isFighting || defenderTeam ? (
              defenderTeam?.characters.map((character) => (
                <li key={character.id}>
                  <span className="inline-block animate-defenderCharge">
                    <FighterDetails characterId={character.id} />
                  </span>
                </li>
              ))
            ) : (
              <Select
                className="text-black"
                placeholder="Select a team"
                options={opponentOptions}
                onChange={(x) => selectDefenderTeam(x.value)}
              />
            )}
          </ul>

          <p className="row-[1/3] place-self-center text-[clamp(2rem,20vmin,9rem)]">
            {isFighting ? "" : isCounting ? countdown : "⚔️"}
          </p>
        </div>
      </div>
      {/* isFigting is neccessary so it won't try to render until button is pressed can remove challengerTeam,
      defenderTeam once me make it impossible to start combat. Or leave it just in case */}
      {isFighting && challengerTeam && defenderTeam && (
        <div className="flex flex-col">
          <Combat
            challengerTeam={challengerTeam}
            defenderTeam={defenderTeam}
            hidden={!isFighting}
          />
        </div>
      )}
    </>
  );
}
