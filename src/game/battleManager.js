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
  nextTurn() {
    if (!this.isBattling) return;
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
  turnMsg() {
    if (!this.isBattling) return;
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
}
