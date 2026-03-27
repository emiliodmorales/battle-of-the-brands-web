export default class Team {
  constructor(name, roster) {
    this.name = name;
    this.roster = roster;
    this.current = 0;
  }

  getFighter() {
    return this.roster[this.current];
  }

  killFighter() {
    this.current = this.current + 1;
  }
  isEveryoneDead() {
    return this.current >= this.roster.length;
  }
}
