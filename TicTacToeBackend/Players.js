export let players = [];
export const updatePlayers = (newPlayersArr) => {
  players.length = 0;
  players.push(...newPlayersArr);
};
