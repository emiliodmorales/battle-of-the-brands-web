const API = import.meta.env.VITE_API + "/teams";
const USER_API = import.meta.env.VITE_API + "/users";

/**
 * @typedef {object} Team
 * @property {number} id
 * @property {number} userId
 * @property {string} name
 */

/**
 * @typedef {object} BattleHistory
 * @property {BattleTeam[]} battle_history
 * @property {number} total_battles
 * @property {number} wins
 * @property {number} losses
 * @property {number} draws
 */

/**
 * @typedef {object} BattleTeam
 * @property {Team} challenger
 * @property {Team} defender
 * @property {Team} winner
 */

/**
 * @returns {Promise<Team[]>} array of all teams
 */
export async function getTeams() {
  const res = await fetch(API);
  const teams = await res.json();
  return teams;
}

/**
 * @param {number} id - The team id
 * @returns {Promise<Team>} the team with the given id
 */
export async function getTeamById(id) {
  const res = await fetch(API + "/" + id);
  const team = await res.json();
  return team;
}

/**
 * Get a user's favorite teams
 * @param {string} token - User's auth token
 * @returns {Promise<Team>} array of favorite teams
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
 * Check if the team is already favorited
 * @param {number} id - The team id
 * @param {string} token - User's auth token
 * @throws Will throw an error if user is signed out
 */
export async function getIsFavoriteTeam(id, token) {
  if (!token) return false;

  const response = await fetch(USER_API + "/favorite_teams/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const result = await response.json();

  if (!response.ok) {
    throw Error(result.message);
  }

  return result;
}

/**
 * Favorite a team
 * @param {number} id - The team id
 * @param {string} token - User's auth token
 * @throws Will throw an error if user is signed out
 */
export async function addFavoriteTeam(id, token) {
  if (!token) {
    throw Error("You must be signed in to favorite a team.");
  }

  const response = await fetch(USER_API + "/favorite_teams", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

/**
 * Unfavorite a team
 * @param {number} id - The team id
 * @param {string} token - User's auth token
 * @throws Will throw an error if user is signed out
 */
export async function removeFavoriteTeam(id, token) {
  if (!token) {
    throw Error("You must be signed in to favorite a team.");
  }

  const response = await fetch(USER_API + "/favorite_teams", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

/**
 * @returns {Promise<BattleHistory>} battle history
 */
export async function getTeamHistory(id) {
  const res = await fetch(API + `/${id}/history`);
  const teams = await res.json();
  return teams;
}

/**
 * @returns {Promise<Team>} the newly created team
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

/**
 * @returns {Promise<boolean>} current status
 */
export async function deleteTeam(id, token) {
  if (!token) {
    throw Error("Sign in to delete a team.");
  }
  const response = await fetch(API + "/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    let errorMsg = "Failed to delete team.";
    try {
      const result = await response.json();
      errorMsg = result.message || errorMsg;
    } catch {
      try {
        errorMsg = await response.text();
      } catch {}
    }
    throw Error(errorMsg);
  }
  return true;
}

/**
 * @returns {Promise<Team>} the updated team
 */
export async function updateTeam(id, teamData, token) {
  if (!token) {
    throw Error("Sign in to update team.");
  }
  const response = await fetch(API + "/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(teamData),
  });
  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message || "Failed to update team.");
  }
  return await response.json();
}
