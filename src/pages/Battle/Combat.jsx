import Fighter from "./BattleManager/Fighter";
import Team from "./BattleManager/Team";
import BattleManager from "./BattleManager/BattleManager";
import { useState, useRef } from "react";

export default function Combat({ challengerTeam, defenderTeam }) {
  const [turn, setTurn] = useState(0);
  const [winner, setWinner] = useState(null);
  const [animated, setAnimated] = useState(false);

  const createFighter = (c) =>
    new Fighter(c.name, c.image, c.hp, c.attack, c.defense, c.ability);

  const currentChallengerTeam = useRef(
    new Team(challengerTeam.name, challengerTeam.characters.map(createFighter)),
  );
  const currentDefenderTeam = useRef(
    new Team(defenderTeam.name, defenderTeam.characters.map(createFighter)),
  );

  const battleManager = useRef(
    new BattleManager(
      currentChallengerTeam.current,
      currentDefenderTeam.current,
    ),
  );

  const currentChallenger = currentChallengerTeam.current.getFighter();
  const currentDefender = currentDefenderTeam.current.getFighter();

  const nextTurn = () => {
    const result = battleManager.current.nextTurn();
    setAnimated(true);
    setTimeout(() => {
      if (result) setWinner(result);
      setTurn((turn) => turn + 1);
    }, 1000);
  };

  if (!challengerTeam || !defenderTeam)
    return <p>This is empty and you aren't supposed to see it</p>;
  if (!currentChallenger || !currentDefender) {
    if (winner === null) return <p>Determining winner</p>;
    if (winner === "Draw") return <p>It has ended in a draw</p>;
    return (
      <section className="grid">
        <p>The winner is {winner}</p>
        <p className="text-[64px] place-self-center">🏆</p>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-[45%_10%_45%] grid-rows-[5%_5%_65%_25%] h-[50vh] w-[100vh]">
      <p className="col-start-1 place-self-center pb-2">
        {challengerTeam.name}
      </p>
      <p className="col-start-3 place-self-center pb-2">{defenderTeam.name}</p>
      <p className="col-start-1 row-start-2 place-self-center pb-2">
        {currentChallenger.name}
      </p>
      <p className="col-start-3 row-start-2 place-self-center pb-2">
        {currentDefender.name}
      </p>
      <img
        className={`col-start-1 row-start-3 w-full h-full object-contain ${animated ? "animate-challengerAttack" : ""}`}
        src={currentChallenger.img}
        alt={currentChallenger.name}
        onAnimationEnd={() => setAnimated(false)}
      />
      <img
        className={`col-start-3 row-start-3 w-full h-full object-contain ${animated ? "animate-defenderAttack" : ""}`}
        src={currentDefender.img}
        alt={currentDefender.name}
        onAnimationEnd={() => setAnimated(false)}
      />
      <p className="col-start-1 row-start-4 place-self-center">
        {currentChallenger.hp}/{currentChallenger.maxHp}
      </p>
      <p className="col-start-3 row-start-4 place-self-center">
        {currentDefender.hp}/{currentDefender.maxHp}
      </p>
      <div className="col-start-2 row-start-4 place-self-center">
        <button onClick={nextTurn}>Next Turn</button>
      </div>
    </section>
  );
}
