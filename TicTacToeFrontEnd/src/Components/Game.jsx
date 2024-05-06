import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import GameGrid from "./GameGrid";
import GameButton from "./GameButton";
export default function Game({ name }) {
  const [message, setMessage] = useState("Please Pick");
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState("");
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);
  function connectToServer() {
    const newSocket = io("ws://127.0.0.1:8080/", { query: `name=${name}` });
    setSocket(newSocket);
    newSocket.on("connect", () => {
      console.log("connected to server");
    });
    newSocket.on("message", (message) => {
      setError("");
      setMessage(message);
      console.log(message);
    });
    newSocket.on("error", (error) => {
      setError(error);
    });
    newSocket.on("grid", (newGrid) => {
      console.log("this is new grid" + newGrid);
      setGrid(newGrid);
    });

    newSocket.on("over", (message) => {
      setGameOver(true);
      setMessage(message);
    });

    newSocket.on("play-again", () => {
      setBtnClicked(false);
      setGameOver(false);
    });
  }

  function playAgain() {
    setBtnClicked(true);
    socket.emit("play-again");
  }

  useEffect(() => {
    connectToServer();
  }, []);

  const emitHandler = (event, message) => {
    if (socket) {
      socket.emit(event, message);
    } else {
      console.error("Socket connection  not established");
    }
  };

  return (
    <>
      <div className="center">
        <h2 className="message">{message}</h2>
        <div className="error">{error && error}</div>
        <GameGrid emitHandler={emitHandler} grid={grid} />
        {gameOver && (
          <GameButton
            handleClick={playAgain}
            btnClicked={btnClicked}
            classes={`margin-10 ${btnClicked && " bg-green"}`}
            label={btnClicked ? "Waiting for another player" : "Play Again"}
          />
        )}
      </div>
    </>
  );
}
