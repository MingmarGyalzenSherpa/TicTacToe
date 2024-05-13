export const lobbiesToLobbiesDetails = (lobbies) => {
  return lobbies.map((lobby) => {
    return {
      name: lobby.name,
      players: lobby.players.map((player) => {
        return player.name;
      }),
      status: lobby.players.length == 2 ? "close" : "open",
    };
  });
};
