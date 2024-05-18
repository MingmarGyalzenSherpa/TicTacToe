import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socketContext";

export default function CreateLobby() {
  const [lobbyName, setLobbyName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const handleLobbyNameChange = (e) => {
    setLobbyName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePlayerNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const data = {
      name: playerName,
      lobbyName,
      password,
    };
    console.log(data);
    if (!socket) return;
    socket.emit("create-lobby", JSON.stringify(data));
    socket.once("create-lobby-response", handleCreateLobbyResponse);
  };

  const handleCreateLobbyResponse = (response) => {
    const data = JSON.parse(response);
    console.log(data);
    if (data.status == "failure") {
      console.log("err hai");
      setErr(data.message);
    } else {
      sessionStorage.setItem("id", socket.id);
      console.log("getting ");
      navigate(`/loader/${data.name}`);
    }
  };

  return (
    <div className="create-lobby">
      <form className="form-card">
        <h2>Create a Lobby</h2>
        <p className="err">{err}</p>

        <div className="input-wrapper">
          <input
            type="text"
            onChange={handlePlayerNameChange}
            placeholder="Enter your user name"
          />
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            onChange={handleLobbyNameChange}
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
        {lobbyName == "" || playerName == "" ? (
          <Link
            onClick={(e) => {
              setErr("Lobby name or player name can't be empty");
              e.preventDefault();
            }}
            className="btn w-100 mt-40"
          >
            CREATE
          </Link>
        ) : (
          <button onClick={handleSubmitClick} className="btn w-100 mt-40">
            CREATE
          </button>
        )}
      </form>
    </div>
  );
}
