import Fighter from "./Fighter.js";
import Team from "./team.js";
import BattleManager from "./battleManager.js";

const teamA = new Team(
  "Ash's Team",
  new Fighter("Pikachu", 5, 10, 2, null),
  new Fighter("Charizard", 5, 10, 2, null),
  new Fighter("Bulbasaur", 5, 10, 2, null),
  new Fighter("Geodude", 5, 10, 2, null),
  new Fighter("Beedrill", 25, 10, 2, null),
);
const teamB = new Team(
  "Taich's Team",
  new Fighter("Agumon", 5, 10, 2, null),
  new Fighter("Numemon", 5, 10, 2, null),
  new Fighter("Birdramon", 5, 10, 2, null),
  new Fighter("Monzaemon", 5, 10, 2, null),
  new Fighter("Vegiemon", 5, 10, 2, null),
);
const currentBattle = new BattleManager(teamA, teamB);
currentBattle.startBattle();
console.log(currentBattle);
