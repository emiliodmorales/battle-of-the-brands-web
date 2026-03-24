const USER_API = import.meta.env.VITE_API + "/users";

export async function getUser(id) {
  const response = await fetch(USER_API + "/" + id);
  const result = await response.json();
  return result;
}

export async function getUserHistory(id) {
  const response = await fetch(USER_API + "/" + id + "/history");
  const result = await response.json();
  return result;
}

export async function getUserTeams(id) {
  const response = await fetch(USER_API + "/" + id + "/teams");
  const result = await response.json();
  return result;
}

export async function getUserCharacters(id) {
  const response = await fetch(USER_API + "/" + id + "/characters");
  const result = await response.json();
  return result;
}

export async function getUserFollowers(id) {
  const response = await fetch(USER_API + "/" + id + "/followers");
  const result = await response.json();
  return result;
}

export async function getUserFollowing(id) {
  const response = await fetch(USER_API + "/" + id + "/following");
  const result = await response.json();
  return result;
}

export async function followUser(id, token) {
  await fetch(USER_API + "/" + id + "/following", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export async function unfollowUser(id, token) {
  await fetch(USER_API + "/" + id + "/following", {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
