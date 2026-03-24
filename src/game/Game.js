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

  isAlive() {
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
