const USER_API = import.meta.env.VITE_API + "/users";

/**
 * @typedef {object} User
 * @property {number} id
 * @property {string} username
 * @property {string} password
 * @property {string} image
 */

/**
 * @typedef {object} Team
 * @property {number} id
 * @property {number} userId
 * @property {string} name
 */

/**
 * @typedef {object} Character
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {string} image
 * @property {number} hp
 * @property {number} attack
 * @property {number} defense
 * @property {number} abilityId
 * @property {number} userId
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
 * @param {number} id
 * @returns {Promise<User>}
 */
export async function getUser(id) {
  const response = await fetch(USER_API + "/" + id);
  const result = await response.json();
  return result;
}

/**
 * @param {number} id
 * @returns {Promise<BattleHistory>}
 */
export async function getUserHistory(id) {
  const response = await fetch(USER_API + "/" + id + "/history");
  const result = await response.json();
  return result;
}

/**
 * @param {number} id
 * @returns {Promise<Team[]>}
 */
export async function getUserTeams(id) {
  const response = await fetch(USER_API + "/" + id + "/teams");
  const result = await response.json();
  return result;
}

/**
 * @param {number} id
 * @returns {Promise<Character[]>}
 */
export async function getUserCharacters(id) {
  const response = await fetch(USER_API + "/" + id + "/characters");
  const result = await response.json();
  return result;
}

/**
 * @param {number} id
 * @returns {Promise<User[]>}
 */
export async function getUserFollowers(id) {
  const response = await fetch(USER_API + "/" + id + "/followers");
  const result = await response.json();
  return result;
}

/**
 * @param {number} id
 * @returns {Promise<User[]>}
 */
export async function getUserFollowing(id) {
  const response = await fetch(USER_API + "/" + id + "/following");
  const result = await response.json();
  return result;
}

/**
 * @param {number} id
 * @param {string} token
 * @returns {Promise<string>}
 */
export async function getUserIsFollowing(id, token) {
  const response = await fetch(USER_API + "/" + id + "/is_following", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const result = await response.json();
  return result;
}

/**
 * @param {number} id id of user to follow
 * @param {string} token
 */
export async function followUser(id, token) {
  await fetch(USER_API + "/" + id + "/following", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

/**
 * @param {number} id id of user to unfollow
 * @param {string} token
 */
export async function unfollowUser(id, token) {
  await fetch(USER_API + "/" + id + "/following", {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
