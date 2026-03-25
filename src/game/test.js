import Fighter from "./Fighter.js";
import Team from "./team.js";
import BattleManager from "./battleManager.js";

const teamA = new Team(
  "teamA's name",
  new Fighter("a", 10, 2, 1, null),
  new Fighter("b", 10, 2, 1, null),
  new Fighter("c", 10, 2, 1, null),
  new Fighter("d", 10, 2, 1, null),
  new Fighter("e", 10, 2, 1, null),
);
const teamB = new Team(
  "not teamA's name",
  new Fighter("z", 10, 1, 1, null),
  new Fighter("f", 10, 1, 1, null),
  new Fighter("dy", 10, 1, 1, null),
  new Fighter("dylan", 10, 1, 1, null),
  new Fighter("greg", 10, 1, 1, null),
);
const currentBattle = new BattleManager(teamA, teamB);
currentBattle.startBattle();
console.log(currentBattle);
