export let lobbies = [];

export const updateLobbies = (newLobbiesArray) => {
  lobbies.length = 0;
  lobbies.push(...newLobbiesArray);
};
