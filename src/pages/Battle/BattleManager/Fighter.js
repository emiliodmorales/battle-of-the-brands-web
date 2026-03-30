export default class Fighter {
  constructor(name, image, hp, attack, defense, ability) {
    this.name = name;
    this.img = image;
    this.hp = hp;
    this.maxHp = hp;
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
    let dmg = Math.max(0, attack - this.defense);
    return dmg;
  }

  takeDmg(dmg) {
    this.hp = Math.max(0, this.hp - dmg);
  }
}
