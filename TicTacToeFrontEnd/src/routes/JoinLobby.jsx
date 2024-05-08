import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function JoinLobby() {
  const [lobbyName, setLobbyName] = useState("");
  const [err, setErr] = useState("");

  function handleNameChange(e) {
    setLobbyName(e.target.value);
  }
  console.log(lobbyName);
  return (
    <div className="create-lobby">
      <form className="form-card">
        <h2>Join a Lobby</h2>
        <p className="err">{err}</p>
        <div className="input-wrapper">
          <input
            onChange={handleNameChange}
            onFocus={() => setErr("")}
            type="text"
            placeholder="Enter lobby name"
          />
        </div>
        <div className="input-wrapper">
          <input type="password" placeholder="Enter lobby password" />
        </div>

        {lobbyName == "" ? (
          <Link
            to={"/"}
            onClick={(e) => {
              e.preventDefault();
              setErr("Lobby name can't be empty");
            }}
            className="btn w-100 mt-40"
          >
            CREATE
          </Link>
        ) : (
          <Link to={"/"} className="btn w-100 mt-40">
            CREATE
          </Link>
        )}
      </form>
    </div>
  );
}
