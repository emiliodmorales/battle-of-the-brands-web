const API = import.meta.env.VITE_API + "/teams";

export async function getTeams() {
  const res = await fetch(API);
  const teams = await res.json();
  return teams;
}

export async function getTeamById(id) {
  const res = await fetch(API + "/" + id);
  const team = await res.json();
  return team;
}

export async function getFavoriteTeams() {
  const res = await fetch(API + "/favorite_teams");
  const teams = await res.json();
  return teams;
}
