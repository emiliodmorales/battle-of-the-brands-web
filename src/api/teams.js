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

/**
 * Get a team's battle history
 * @returns battle history
 */
export async function getTeamHistory(id) {
  const res = await fetch(API + `/${id}/history`);
  const teams = await res.json();
  return teams;
}

/**
 * Create a new team
 * @returns the newly created team
 */
export async function createTeam(teamData, token) {
  if (!token) {
    throw Error("You must be signed in to create a team.");
  }

  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(teamData),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message || "Failed to create team.");
  }

  return await response.json();
}
