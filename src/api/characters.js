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

export async function deleteCharacter(token, id) {
  const response = await fetch(API + "/characters/" + id, {
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
