const API = import.meta.env.VITE_API + "/teams";
const USER_API = import.meta.env.VITE_API + "/users";

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

export async function getFavoriteTeams(token) {
  const res = await fetch(USER_API + "/favorite_teams", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const teams = await res.json();
  return teams;
}
