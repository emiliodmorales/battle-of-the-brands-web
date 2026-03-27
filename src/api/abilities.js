const API = import.meta.env.VITE_API;

/**
 * @typedef {object} Ability
 * @property {string} name
 * @property {string} description
 * @property {number} cost
 * @property {number} id
 */

/**
 * @returns {Promise<Ability[]>} array of all abilities
 */
export async function getAbilities() {
  const response = await fetch(API + "/abilities");
  const result = await response.json();
  return result;
}
