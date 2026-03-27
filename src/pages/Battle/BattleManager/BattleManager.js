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
          ? this.teamB.name
          : teamBStatus
            ? this.teamA.name
            : "Error";
    this.isBattling = false;
    return result;
  }

  turnMsg() {
    if (!this.isBattling) return null;
    const attacker = this.teamA.getFighter();
    const defender = this.teamB.getFighter();

    const messages = [];

    messages.push(`${attacker.name} attacked for ${attacker.attack} damage\n`);
    messages.push(`${defender.name} blocked ${defender.defense} damage\n`);

    messages.push(
      `${defender.name} counterattacked for ${defender.attack} damage\n`,
    );
    messages.push(`${attacker.name} blocked ${attacker.defense} damage\n`);

    return messages;
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
      return this.determineWinner(
        this.teamA.isEveryoneDead(),
        this.teamB.isEveryoneDead(),
      );
    }
  }
}
