import TicTacToe from "./TicTacToe.js";

export default class Lobby {
  players = [];
  constructor(name, player, password) {
    this.players.push(player);
    this.password = password;
    this.name = name;
  }

  play() {
    new TicTacToe(...this.players);
  }
}
