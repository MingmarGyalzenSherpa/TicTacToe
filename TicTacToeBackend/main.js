import express from "express";
import { Server } from "socket.io";
import TicTacToe from "./TicTacToe.js";
import cors from "cors";
import { lobbies, updateLobbies } from "./Lobbies.js";
import Player from "./Player.js";
import Lobby from "./Lobby.js";
import { lobbiesToLobbiesDetails } from "./helper/helper.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(cookieParser());

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
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000,
  },
  cors: {
    origin: "*",
  },
});
let pendingUser = null;

io.on("connection", (socket) => {
  socket.on("leave-room", (response) => {
    try {
      const data = JSON.parse(response);
      console.log(data);
      let lobby = lobbies.find((lobby) => lobby.name == data.lobbyName);
      console.log(lobby);
      if (!lobby) {
        socket.emit(
          "leave-room-response",
          JSON.stringify({
            message: "No lobby room found",
            status: "failure",
          })
        );
        return;
      }
      console.log("haha");
      lobby.removePlayer(data.socketID);

      socket.emit(
        "leave-room-response",
        JSON.stringify({
          message: "Player removed successfully",
          status: "success",
        })
      );
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("reconnect-user", (response) => {
    const data = JSON.parse(response);
    console.log("data of player");
    console.log(data);

    console.log(socket.id);
    let lobbyFound = lobbies.find((lobby) => lobby.name == data.lobbyName);
    if (lobbyFound) {
      console.log("before update");
      console.log(lobbyFound.players);
      lobbyFound.updatePlayers(socket, data.socketID);
      console.log("updated player in lobby");
      console.log(lobbyFound.players);
      socket.emit(
        "reconnect-user-response",
        JSON.stringify({
          message: "Reconnect successful",
          status: "success",
        })
      );
      //player match garnu parxa corresponding
      //player match bhaye tesko socket id update garni
      //update garesi broadcast garni
    }
  });

  socket.on("browse-lobbies", () => {
    let lobbiesDetails = lobbiesToLobbiesDetails(lobbies);
    console.log(lobbiesDetails);
    socket.emit("browse-lobby-response", JSON.stringify(lobbiesDetails));
  });

  //logic for creating a lobby
  socket.on("create-lobby", (data) => {
    try {
      let details = JSON.parse(data);

      const newLobby = new Lobby(
        details.lobbyName,
        new Player(details.name, socket),
        details.password
      );

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

      io.emit(
        "create-lobby-response",
        JSON.stringify({
          message: "Lobby created successfully",
          status: "success",
          name: newLobby.name,
        })
      );
      let lobbiesDetails = lobbiesToLobbiesDetails(lobbies);

      io.emit("browse-lobby-response", JSON.stringify(lobbiesDetails));

      socket.on("cancel", () => {
        let newlobbies = lobbies.filter((lobby) => lobby.name != newLobby.name);
        updateLobbies(newlobbies);
        console.log("lobbies after deletion");
        console.log(lobbies);
        let lobbiesDetails = lobbiesToLobbiesDetails(lobbies);
        io.emit("browse-lobby-response", JSON.stringify(lobbiesDetails));
        socket.emit(
          "cancel-response",
          JSON.stringify({
            message: "Lobby cancelled successfully",
            status: "success",
          })
        );
      });
    } catch (err) {
      console.log("Error while creating lobby");
      console.log(err);
    }
  });

  //leave-rooom
  console.log("before leave room");

  console.log("after leave room");

  //logic for joining a lobby
  socket.on("join-lobby", (data) => {
    try {
      //data consists the name of the lobby,name of player and password
      let details = JSON.parse(data);
      console.log("socket id inside join lobby", socket.id);
      for (let lobby of lobbies) {
        if (
          lobby.name == details.lobbyName &&
          lobby.password == details.password
        ) {
          if (lobby.players.length == 2) {
            socket.emit(
              "join-lobby-response",
              JSON.stringify({
                message: "Lobby is full",
                status: "failure",
              })
            );
            return;
          }
          lobby.players[0].socket.emit(
            "waiting-player-response",
            "Player found"
          );
          lobby.players.push(new Player(details.name, socket));

          socket.emit(
            "join-lobby-response",
            JSON.stringify({
              message: "Your game will start shortly",
              status: "success",
            })
          );

          lobby.start();
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
    } catch (err) {
      console.log(err);
    }
  });
});
