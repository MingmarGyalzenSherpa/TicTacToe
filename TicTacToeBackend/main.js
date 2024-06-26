import express from "express";
import { Server } from "socket.io";
import TicTacToe from "./TicTacToe.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "https://tic-tac-toe-z6tc.vercel.app",
  })
);

const server = app.listen(8080, () => {
  console.log("listening on 8080");
});

app.get("*", (req, res, next) => {
  res.status(200).json({
    message: "bad request",
  });
});

app.get("/", (req, res) => {
  res.send("welcome to tic tac toe");
});

const io = new Server(server, {
  cors: {
    origin: "https://tic-tac-toe-z6tc.vercel.app",
  },
});
let pendingUser = null;

io.use((socket, next) => {
  console.log(socket.request._query["name"]);
  socket.userName = socket.request._query["name"];
  next();
});

io.on("connection", (socket) => {
  console.log("Connection made");
  console.log(socket.userName);
  if (socket.recovered) {
    console.log("Client reconnected", socket.id);
  }
  if (!pendingUser) {
    pendingUser = socket;
    socket.emit("message", "Waiting for another player");
  } else {
    pendingUser.emit("message", "Player found game starting");
    socket.emit("message", "Starting game");
    new TicTacToe(pendingUser, socket);
    pendingUser = null;
  }
});
