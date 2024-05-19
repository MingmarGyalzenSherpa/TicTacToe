import TicTacToe from "./TicTacToe.js";

export default class Lobby {
  players = [];
  ticTacToe;
  constructor(name, player, password) {
    this.players.push(player);
    this.password = password;
    this.name = name;
  }

  updatePlayers(newSocket, oldSocketID) {
    this.players.forEach((player) => {
      if (player.socket.id == oldSocketID) {
        this.ticTacToe.turn =
          this.ticTacToe.turn == player.socket
            ? newSocket
            : this.ticTacToe.turn; //update turn socket
        player.socket = newSocket; //update player socket
      }
    });
    this.broadCast();
    this.setEventListener();
  }

  leaveGame(){
    this.players.forEach((player)=>{
      player.socket.on("leave-room",(response)=>{
        const data = JSON.parse(response);
        
      })
    })
  }

  removePlayer(socketID) {
    this.players = this.players.filter(
      (player) => player.socket.id != socketID
    );
  }

  start() {
    this.ticTacToe = new TicTacToe(...this.players);
  }

  broadCast(oldSocket) {
    this.ticTacToe.broadCast(oldSocket);
  }

  setEventListener() {
    this.ticTacToe.setUpInitialEventListener();
  }
  
}
