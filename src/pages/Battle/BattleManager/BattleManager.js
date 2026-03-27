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

    messages.push(`${attacker.name} attacks for ${attacker.attack} damage\n`);
    if (defender.defense >= attacker.attack)
      messages.push(`${defender.name} blocks all the damage\n`);
    else messages.push(`${defender.name} blocks ${defender.defense} damage\n`);

    messages.push(
      `${defender.name} counterattacks for ${defender.attack} damage\n`,
    );
    if (attacker.defense >= defender.attack)
      messages.push(`${attacker.name} blocks all the damage\n`);
    else messages.push(`${attacker.name} blocks ${attacker.defense} damage\n`);

    if (
      defender.defense >= attacker.attack &&
      attacker.defense >= defender.attack
    )
      messages.push(
        `${attacker.name} and ${defender.name} are equally matched and both fainted`,
      );

    return messages;
  }

  nextTurn() {
    if (!this.isBattling) return null;
    const attacker = this.teamA.getFighter();
    const defender = this.teamB.getFighter();

    if (
      defender.defense >= attacker.attack &&
      attacker.defense >= defender.attack
    ) {
      this.teamA.killFighter();
      this.teamB.killFighter();
    }

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
