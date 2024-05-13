import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="home">
      <h1>WELCOME TO TICTACTOE</h1>
      <div className="routes">
        <Link to={"/create-lobby"} className="btn">
          Create a Lobby
        </Link>
        <Link to={"/browse-lobby"} className="btn">
          Browse Lobbies
        </Link>
        <Link to={"/join-lobby"} className="btn">
          Join a Lobby
        </Link>
        <Link to={"/"} className="btn">
          Join A Random Game
        </Link>
      </div>
    </div>
  );
}
