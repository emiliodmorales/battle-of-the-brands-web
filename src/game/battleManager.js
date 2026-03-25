// When using BattleManager we are team.js

export default class BattleManager {
  constructor(teamA, teamB) {
    this.teamA = teamA;
    this.teamB = teamB;
    this.isBattling = true;
  }
  startBattle() {
    console.log("The fight has started");
    this.battleLoop();
  }
  stopBattle(winner) {
    console.log("The battle has ended. " + winner + " is the winner");
    this.isBattling = false;
  }
  battleLoop() {
    while (this.isBattling) {
      const attacker = this.teamA.getFighter();
      const defender = this.teamB.getFighter();

      attacker.doAttack(defender);
      defender.doAttack(attacker);

      if (attacker.hp === 0) {
        this.teamA.killFighter();
        if (this.teamA.isEveryoneDead()) {
          this.stopBattle(this.teamB.name);
        }
      }
      if (defender.hp === 0) {
        this.teamB.killFighter();
        if (this.teamB.isEveryoneDead()) {
          this.stopBattle(this.teamA.name);
        }
      }
    }
  }
}
