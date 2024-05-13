import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import GameGrid from "../Components/GameGrid";
import GameButton from "../Components/GameButton";
import { SocketContext } from "../context/socketContext";
export default function Game() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [grid, setGrid] = useState([
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
  ]);
  const [gameOver, setGameOver] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);
  const socket = useContext(SocketContext);
  function connectToServer() {
    if (!socket) return;
    socket.on("connect", () => {
      console.log("connected to server");
    });


    socket.on("disconnect", () => {
      console.log("trying to reconnect");
    });

    socket.on("message", (message) => {
      setError("");
      setMessage(message);
      console.log(message);
    });
    socket.on("error", (error) => {
      setError(error);
    });
    socket.on("grid", (newGrid) => {
      console.log("this is new grid" + newGrid);
      setGrid(newGrid);
    });

    socket.on("over", (message) => {
      setGameOver(true);
      setMessage(message);
    });

    socket.on("play-again", () => {
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
    <div className="game">
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
    </div>
  );
}
