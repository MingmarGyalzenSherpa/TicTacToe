import { useState } from "react";
import "./App.css";
import GameButton from "./Components/GameButton";
import InputField from "./Components/InputField";
import Game from "./Components/Game";

function App() {
  const [name, setName] = useState("");
  const [enteredGame, setEnteredGame] = useState(false);

  function handleInput(input) {
    setName(input);
  }

  function handleClick() {
    setEnteredGame((enteredGame) => !enteredGame);
  }

  return (
    <div className="app">
      {enteredGame == false ? (
        <div className="center">
          <h1>WELCOME TO TICTACTOE</h1>
          <form onSubmit={handleClick}>
            <InputField handleInput={handleInput} />

            <GameButton label={"START GAME"} handleClick={handleClick} />
          </form>
        </div>
      ) : (
        <Game name={name} />
      )}
    </div>
  );
}

export default App;
