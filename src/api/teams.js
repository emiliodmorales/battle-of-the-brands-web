const API = import.meta.env.VITE_API + "/teams";
const USER_API = import.meta.env.VITE_API + "/users";

/**
 * @returns array of all teams
 */
export async function getTeams() {
  const res = await fetch(API);
  const teams = await res.json();
  return teams;
}

/**
 * Get a team by its id
 * @param {number} id - The team id
 * @returns the team with the given id
 */
export async function getTeamById(id) {
  const res = await fetch(API + "/" + id);
  const team = await res.json();
  return team;
}

/**
 * Get a user's favorite teams
 * @param {string} token - User's auth token
 * @returns array of favorite teams
 */
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
