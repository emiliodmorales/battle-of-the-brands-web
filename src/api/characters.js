const CHAR_API = import.meta.env.VITE_API + "/characters";
const USER_API = import.meta.env.VITE_API + "/users";

/**
 * @typedef {object} CharacterInfo
 * @property {string} name
 * @property {string} description
 * @property {string} image
 * @property {number} hp
 * @property {number} attack
 * @property {number} defense
 * @property {number} abilityId
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
 * @returns {Promise<Character[]>} array of all characters
 */
export async function getCharacters() {
  const response = await fetch(CHAR_API);
  const result = await response.json();
  return result;
}

/**
 * @param {number} id - The character id
 * @returns {Promise<Character>} the character
 */
export async function getCharacterDetails(id) {
  const response = await fetch(CHAR_API + "/" + id);
  const result = await response.json();
  return result;
}

/**
 * @param {number} id - The character id
 * @returns {Promise<BattleHistory>} the character's history
 */
export async function getCharacterHistory(id) {
  const response = await fetch(CHAR_API + "/" + id + "/history");
  const result = await response.json();
  return result;
}

/**
 * Delete a character by its id. Uses token to restrict deletion to the creator.
 * @param {string} token - User's auth token
 * @param {number} id - The character id
 */
export async function deleteCharacter(token, id) {
  const response = await fetch(CHAR_API + "/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

/**
 * Create a new character. Uses token to store creator id.
 * @param {CharacterInfo} charData - The character to create
 * @param {string} token - User's auth token
 * @returns {Promise<Character>} the newly created character
 * @throws Will throw an error if the token is null
 */
export async function createCharacter(charData, token) {
  if (!token) {
    throw Error("You must be signed in to create a character.");
  }

  const response = await fetch(CHAR_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(charData),
  });
  const result = await response.json();

  if (!response.ok) {
    throw Error(result.message);
  }

  return result;
}

/**
 * Update a character by its id. Uses token to restrict update to the creator.
 * @param {CharacterInfo} charData - The character to update
 * @param {string} token - User's auth token
 * @param {number} id - Character id to update
 * @returns {Promise<Character>} the updated character
 * @throws Will throw an error if user is signed out
 */
export async function updateCharacter(charData, token, id) {
  if (!token) {
    throw Error("You must be signed in to create a character.");
  }

  const response = await fetch(CHAR_API + "/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(charData),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

/**
 * Check if the character is already favorited
 * @param {number} id - The character id
 * @param {string} token - User's auth token
 * @throws Will throw an error if user is signed out
 */
export async function getIsFavoriteCharacter(id, token) {
  if (!token) return false;

  const response = await fetch(USER_API + "/favorite_characters/" + id, {
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
 * Favorite a character
 * @param {number} id - The character id
 * @param {string} token - User's auth token
 * @throws Will throw an error if user is signed out
 */
export async function addFavoriteCharacter(id, token) {
  if (!token) {
    throw Error("You must be signed in to favorite a character.");
  }

  const response = await fetch(USER_API + "/favorite_characters", {
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
 * Unfavorite a character
 * @param {number} id - The character id
 * @param {string} token - User's auth token
 * @throws Will throw an error if user is signed out
 */
export async function removeFavoriteCharacter(id, token) {
  if (!token) {
    throw Error("You must be signed in to favorite a character.");
  }

  const response = await fetch(USER_API + "/favorite_characters", {
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
 * Get a user's favorite characters
 * @param {string} token - User's auth token
 * @returns {Promise<Character[]>} array of favorite characters
 * @throws Will throw an error if user is signed out
 */
export async function getFavoriteCharacters(token) {
  if (!token) {
    throw Error("You must be signed in to favorite a character.");
  }

  const response = await fetch(USER_API + "/favorite_characters", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const result = await response.json();
  return result;
}
