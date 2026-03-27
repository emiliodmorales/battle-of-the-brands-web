import Fighter from "./BattleManager/Fighter";
import Team from "./BattleManager/Team";
import BattleManager from "./BattleManager/BattleManager";

export default function Combat({ challengerTeam, defenderTeam }) {
  const createFighter = (c) =>
    new Fighter(c.name, c.hp, c.attack, c.defense, c.ability);

  const challenger = new Team(
    challengerTeam.name,
    challengerTeam.characters.map(createFighter),
  );
  const defender = new Team(
    defenderTeam.name,
    defenderTeam.characters.map(createFighter),
  );

  const battleManager = new BattleManager(challenger, defender);

  const currentChallenger = challenger.getFighter();
  const currentDefender = defender.getFighter();

  if (!challenger || !defender)
    return <p>This is empty and you aren't supposed to see it</p>;

  console.log(challengerTeam.characters);
  console.log(currentChallenger);
  return (
    <section className="grid grid-cols-[45%_10%_45%] grid-rows-[5%_5%_65%_25%] h-[50vh] w-[100vh]">
      <p className="col-start-1 place-self-center">{challenger.name}</p>
      <p className="col-start-3 place-self-center">{defender.name}</p>
      <p className="col-start-1 row-start-2 place-self-center">
        {currentChallenger.name}
      </p>
      <p className="col-start-3 row-start-2 place-self-center">
        {currentDefender.name}
      </p>
      <img
        className="col-start-1 row-start-3 w-full h-full object-contain"
        src={currentChallenger.image}
        alt={currentChallenger.name}
      />
      <img
        className="col-start-3 row-start-3 "
        src={currentDefender.image}
        alt={currentDefender.name}
      />
      <p className="col-start-1 row-start-4 place-self-center">
        {currentChallenger.hp}/{currentChallenger.maxHp}
      </p>
      <p className="col-start-3 row-start-4 place-self-center">
        {currentDefender.hp}/{currentDefender.maxHp}
      </p>
    </section>
  );
}
