export default class Fighter {
  constructor(name, maxHp, attack, defense, ability) {
    this.name = name;
    this.hp = maxHp;
    this.maxHp = maxHp;
    this.attack = attack;
    this.defense = defense;
    this.ability = ability;
  }
  isDead() {
    return this.hp === 0;
  }

  attackTarget(target) {
    let dmg = target.defend(this.attack);
    target.takeDmg(dmg);
  }

  defend(attack) {
    let dmg = attack - this.defense;
    return dmg;
  }

  takeDmg(dmg) {
    this.hp = Math.max(0, (this.hp -= dmg));
  }
}
