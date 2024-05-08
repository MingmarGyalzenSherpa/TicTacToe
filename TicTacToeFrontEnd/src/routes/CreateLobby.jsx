import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CreateLobby() {
  const [lobbyName, setLobbyName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const handleNameChange = (e) => {
    setLobbyName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className="create-lobby">
      <form className="form-card">
        <h2>Create a Lobby</h2>
        <p className="err">{err}</p>
        <div className="input-wrapper">
          <input
            type="text"
            onChange={handleNameChange}
            placeholder="Enter your lobby name"
          />
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            onChange={handlePasswordChange}
            placeholder="Enter your lobby password"
          />
        </div>
        <p>Note: Leave password empty to create a free to join game</p>
        {lobbyName == "" ? (
          <Link
            to={"/"}
            onClick={(e) => {
              setErr("Lobby name can't be empty");
              e.preventDefault();
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
