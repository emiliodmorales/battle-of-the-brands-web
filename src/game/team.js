export default class Team {
  constructor(name, fighter1, fighter2, fighter3, fighter4, fighter5) {
    this.name = name;
    this.roster = [fighter1, fighter2, fighter3, fighter4, fighter5];
    this.current = 0;
  }
  getFighter() {
    console.log(this.roster[this.current].name + " is your fighter");
    return this.roster[this.current];
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
