export default class BattleManager {
  constructor(teamA, teamB) {
    this.teamA = teamA;
    this.teamB = teamB;
    this.isBattling = true;
  }
  startBattle() {
    this.battleLoop();
  }
  determineWinner(teamAStatus, teamBStatus) {
    let result =
      teamAStatus && teamBStatus
        ? "Draw"
        : teamAStatus
          ? "Winner " + this.teamB.name
          : teamBStatus
            ? "Winner " + this.teamA.name
            : "Error";
    this.stopBattle(result);
  }

  stopBattle(winner) {
    console.log("The battle has ended with a " + winner); // Change this to record the win
    this.isBattling = false;
  }
  battleLoop() {
    while (this.isBattling) {
      const attacker = this.teamA.getFighter();
      const defender = this.teamB.getFighter();

      attacker.attackTarget(defender);
      defender.attackTarget(attacker);

      if (attacker.hp === 0) {
        this.teamA.killFighter();
      }
      if (defender.hp === 0) {
        this.teamB.killFighter();
      }
      if (this.teamA.isEveryoneDead() || this.teamB.isEveryoneDead()) {
        this.determineWinner(
          this.teamA.isEveryoneDead(),
          this.teamB.isEveryoneDead(),
        );
      }
    }
  }
}
