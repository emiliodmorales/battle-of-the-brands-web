const API = import.meta.env.VITE_API;

export async function getCharacters() {
  const response = await fetch(API + "/characters");
  const result = await response.json();
  return result;
}

export async function getCharacterDetails(id) {
  const response = await fetch(API + "/characters/" + id);
  const result = await response.json();
  return result;
}
