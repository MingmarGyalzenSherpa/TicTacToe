import express from "express";
import { Server } from "socket.io";
import TicTacToe from "./TicTacToe.js";
import cors from "cors";
import lobbies from "./Lobbies.js";
import Player from "./Player.js";
import Lobby from "./Lobby.js";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const server = app.listen(8080, () => {
  console.log("listening on 8080");
});

app.get("/", (req, res) => {
  res.send("welcome to tic tac toe");
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
let pendingUser = null;

io.on("connection", (socket) => {
  //logic for creating a lobby
  socket.on("create-lobby", (data) => {
    let details = JSON.parse(data);
    console.log(lobbies);

    const newLobby = new Lobby(
      details.lobbyName,
      new Player(details.name, socket),
      details.password
    );
    console.log(newLobby);
    for (let lobby of lobbies) {
      if (lobby.name == newLobby.name) {
        socket.emit(
          "create-lobby-response",
          JSON.stringify({
            message: "Lobby name already exists",
            status: "failure",
          })
        );
        return;
      }
    }
    lobbies.push(newLobby);
    socket.emit(
      "create-lobby-response",
      JSON.stringify({
        message: "Lobby created successfully",
        status: "success",
      })
    );
  });

  //logic for joining a lobby
  socket.on("join-lobby", (data) => {
    //data consists the name of the lobby,name of player and password
    let details = JSON.parse(data);

    for (let lobby of lobbies) {
      if (
        lobby.name == details.lobbyName &&
        lobby.password == details.password
      ) {
        lobby.players.push(new Player(details.name, socket));
        console.log(lobby);
        socket.emit(
          "join-lobby-response",
          JSON.stringify({
            message: "Your game will start shortly",
            status: "success",
          })
        );
        lobby.play();
        return;
      }
    }
    socket.emit(
      "join-lobby-response",
      JSON.stringify({
        message: "Incorrect lobby name or password",
        status: "failure",
      })
    );
  });
});
