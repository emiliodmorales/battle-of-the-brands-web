export default class Team {
  constructor(name, roster) {
    this.name = name;
    this.roster = roster;
    this.current = 0;
  }

  getActiveFighters() {
    return Object.values(this.roster).filter((fighter) => !fighter.isDead());
  }

  killFighter() {
    // Make this into array later
    console.log(this.roster[this.current].name + " has been killed");
    this.current = this.current + 1;
  }
  isEveryoneDead() {
    return this.current >= this.roster.length;
  }
}
