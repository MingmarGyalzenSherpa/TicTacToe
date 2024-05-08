export default class TicTacToe {
  playerX;
  playerO;
  isAlive;
  turn;
  grid;

  constructor(player1, player2) {
    this.playerX = player1;
    this.playerO = player2;
    this.playerX.socket.on("move", (move) =>
      this.makeMove(this.playerX.socket, JSON.parse(move))
    );
    this.playerO.socket.on("move", (move) =>
      this.makeMove(this.playerO.socket, JSON.parse(move))
    );

    this.addEvent("play-again", (socket) => {
      socket.playAgain = true;
      if (this.playerX.socket.playAgain && this.playerO.socket.playAgain) {
        this.sendMessage("play-again");
        this.play();
      }
    });

    this.play();
  }

  play() {
    this.grid = new Array(9).fill("_");
    this.isAlive = true;
    this.turn = this.playerX.socket;
    this.grid = new Array(9).fill("_");
    this.turn.emit("message", "your turn");
    this.playerO.socket.emit(
      "message",
      `Waiting for ${this.playerX.name}  move`
    );
    this.sendMessage("grid", this.grid);
  }

  addEvent(event, cb) {
    this.playerX.socket.on(event, () => cb(this.playerX.socket));
    this.playerO.socket.on(event, () => cb(this.playerO.socket));
  }

  sendMessage(event, message) {
    this.playerX.socket.emit(event, message);
    this.playerO.socket.emit(event, message);
  }

  makeMove(player, move) {
    console.log("move =");
    console.log(move);
    //move = {pos:0}
    if (this.isAlive == false) {
      // player.emit("message", "game already over");
      return;
    }
    if (player == this.turn) {
      if (this.collisionDetection(move)) {
        player.emit("error", "Please select a valid grid");
        return;
      }
      if (player == this.playerX.socket) {
        this.grid[move.pos] = "X";
        this.turn.emit("message", `Waiting for ${this.playerO.name}  move`);
        this.turn = this.playerO.socket;
        this.turn.emit("message", "Your turn");
      }
      if (player == this.playerO.socket) {
        this.grid[move.pos] = "O";
        this.turn.emit("message", `Waiting for ${this.playerX.name}  move`);

        this.turn = this.playerX.socket;
        this.turn.emit("message", "Your turn");
      }
      this.playerX.socket.emit("grid", this.grid);
      this.playerO.socket.emit("grid", this.grid);
      if (this.checkWinner()) {
        this.isAlive = false;
        this.sendMessage("over", `Winner is ${this.grid[move.pos]}`);
        return;
      }

      if (this.checkDraw()) {
        this.isAlive = false;
        this.sendMessage("over", "It's a draw");
        return;
      }
      this.turn.emit("message", "Your turn");
    } else {
      player.emit("error", "not your turn");
    }
  }

  collisionDetection(move) {
    if (move.pos < 0 || move.pos >= 9 || this.grid[move.pos] != "_") {
      return true;
    } else {
      return false;
    }
  }

  checkDraw() {
    let isDraw = true;
    this.grid.forEach((value) => {
      if (value == "_") {
        isDraw = false;
        return;
      }
    });
    return isDraw;
  }

  checkWinningCondition(grid, condition) {
    const [a, b, c] = condition.map((i) => grid[i]);
    if (a == "_" || b == "_" || c == "_") {
      return false;
    }

    if (a == b && a == c) {
      console.log("equal");
      return true;
    } else {
      return false;
    }
  }

  checkWinner() {
    let won = false;
    const winningConditions = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 4, 6],
      [3, 4, 5],
      [6, 7, 8],
      [2, 5, 8],
    ];

    winningConditions.forEach((condition) => {
      console.log("condition = " + condition);
      if (this.checkWinningCondition(this.grid, condition)) {
        console.log("equal cha hai");
        won = true;
        return;
      }
    });
    return won;
  }
}
