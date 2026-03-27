export default class BattleManager {
  constructor(teamA, teamB) {
    this.teamA = teamA;
    this.teamB = teamB;
    this.isBattling = true;
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

    console.log("The battle has ended with a " + result); // Change this to record the win
    this.isBattling = false;
    return result;
  }

  nextTurn() {
    if (!this.isBattling) return null;
    const attacker = this.teamA.getFighter();
    const defender = this.teamB.getFighter();

    attacker.attackTarget(defender);
    defender.attackTarget(attacker);

    if (attacker.isDead()) {
      this.teamA.killFighter();
    }
    if (defender.isDead()) {
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
