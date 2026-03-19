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

export async function createCharacter(charData, token) {
  if (!token) {
    throw Error("You must be signed in to create a character.");
  }

  const response = await fetch(API + "/characters", {
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

export async function updateCharacter(charData, token, id) {
  if (!token) {
    throw Error("You must be signed in to create a character.");
  }

  const response = await fetch(API + "/characters/" + id, {
    method: "PUT",
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
