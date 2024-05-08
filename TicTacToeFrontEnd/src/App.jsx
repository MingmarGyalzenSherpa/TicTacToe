import { useState } from "react";
import "./App.css";
import GameButton from "./Components/GameButton";
import InputField from "./Components/InputField";
import Game from "./Components/Game";
import { Link } from "react-router-dom";

function App() {
  function handleInput(input) {
    setName(input);
  }

  function handleClick() {
    setEnteredGame((enteredGame) => !enteredGame);
  }

  return (
    <div className="app">
      <div className="center">
        <h1>WELCOME TO TICTACTOE</h1>
        <InputField handleInput={handleInput} />
        <Link to={"/lobby"} className="game-btn">
          Lobby
        </Link>
      </div>
    </div>
  );
}

export default App;
