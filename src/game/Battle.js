import Fighter from "./Fighter";

export default class Battle {
  constructor(home_team, away_team) {
    this.home_team_id = home_team.id;
    this.away_team_id = away_team.id;
    this.home_team = home_team.characters.map(
      (character) =>
        new Fighter(
          character.hp,
          character.attack,
          character.defense,
          character.ability_name,
        ),
    );
    this.away_team = away_team.characters.map(
      (character) =>
        new Fighter(
          character.hp,
          character.attack,
          character.defense,
          character.ability_name,
        ),
    );
    this.first = Math.floor(Math.random() * 2)
      ? this.home_team_id
      : this.away_team_id; // Which team goes first
    this.winner = undefined;
  }

  get allTeams() {
    return [...this.home_team, ...this.away_team];
  }

  get homeAlive() {
    return this.home_team.filter((f) => f.isAlive);
  }
  get awayAlive() {
    return this.away_team.filter((f) => f.isAlive);
  }
  get allAlive() {
    return [...this.homeAlive, ...this.awayAlive];
  }

  tryResolveBattle() {
    if (this.homeAlive.length === 0) {
      this.winner = this.away_team_id;
    } else {
      this.winner = this.home_team_id;
    }
    return this.winner;
  }

  takeTurn() {
    this.all.forEach((fighter) => fighter.flipCoin());

    const act = (fighter, enemyTeam) => {
      if (!fighter.isAlive) return;
      const target = fighter.getTarget(enemyTeam);
      if (target.ability === "First Strike") {
        target.doAttack(fighter);
        fighter.doAttack(target);
      } else {
        fighter.doAttack(target);
        target.doAttack(fighter);
      }
    };

    if (this.first === this.home_team_id) {
      this.homeAlive.forEach((f) => act(f, this.awayAlive));
      this.awayAlive.forEach((f) => act(f, this.homeAlive));
    } else {
      this.awayAlive.forEach((f) => act(f, this.homeAlive));
      this.homeAlive.forEach((f) => act(f, this.awayAlive));
    }

    this.all.forEach((fighter) => {
      if (!fighter.isAlive) return;
      if (fighter.burnStacks > 0) {
        fighter.takeDamage(fighter.burnStacks);
      }
      if (fighter.isAlive && fighter.ability === "Regen") {
        fighter.heal(1);
      }
      if (fighter.ability === "Shield") {
        fighter.raiseShield();
      }
    });
  }

  doBattle() {
    while (!this.tryResolveBattle) {
      this.takeTurn();
    }
    return this.winner;
  }
}
