class Fighter {
  constructor(maxHp, attack, defense, ability) {
    this.hp = maxHp;
    this.maxHp = maxHp;
    this.attack = attack;
    this.defense = defense;
    this.ability = ability;

    this.burnStacks = 0;
    this.coinGood = false; // Gamble doubles damage given?
    this.shielded = false; // Has the shield been used this turn
  }

  addBurn() {
    this.burnStacks++;
  }
  flipCoin() {
    this.coinGood = Math.random() < 0.5;
  }
  useShield() {
    this.shielded = true;
  }
  raiseShield() {
    this.shielded = false;
  }

  get isAlive() {
    return this.hp > 0;
  }

  getTarget(enemyTeam) {
    // Remember to filter for living enemies before passing in
    if (this.ability === "Reach" && enemyTeam.length > 1) {
      return enemyTeam[1];
    }
    return enemyTeam[0];
  }

  doAttack(target) {
    const strikes = this.ability === "Double Strike" ? 2 : 1;
    for (let i = 0; i < strikes; i++) {
      if (this.ability === "Burn") {
        target.addBurn();
      }
      let dmg = target.defend(this, this.attack);
      if (this.ability === "Gamble" && this.coinGood) {
        dmg *= 2;
      }
      target.takeDamage(dmg);
    }
  }

  defend(attacker, attack) {
    let dmg = attack - this.defense;
    if (this.ability === "Dodge" && Math.floor(Math.random() * 4) === 0) {
      return 0;
    }
    if (this.ability === "Shield" && !this.shielded) {
      dmg = 0;
      this.useShield();
    }
    if (this.ability === "Durable") {
      dmg *= 0.8;
    }
    if (this.ability === "Gamble" && !this.coinGood) {
      dmg *= 2;
    }
    if (dmg < 0) {
      dmg = 0;
    }
    if (attacker.ability === "Thorn") {
      dmg++;
    }
    return dmg;
  }

  takeDamage(dmg) {
    this.hp -= dmg;
    if (this.hp < 0) {
      this.hp = 0;
    }
  }
  heal(hp) {
    this.hp += hp;
    if (this.hp > this.maxHp) {
      this.hp = this.maxHp;
    }
  }
}

class Battle {
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
