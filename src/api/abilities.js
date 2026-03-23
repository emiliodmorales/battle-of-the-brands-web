const API = import.meta.env.VITE_API;

export async function getAbilities() {
  const response = await fetch(API + "/abilities");
  const result = await response.json();
  return result;
}
