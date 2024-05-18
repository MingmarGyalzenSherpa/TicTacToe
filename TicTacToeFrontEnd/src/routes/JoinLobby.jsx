import React, { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SocketContext } from "../context/socketContext";

export default function JoinLobby() {
  const [username, setUsername] = useState("");
  const [lobbyName, setLobbyName] = useState("");
  const [password, setPassword] = useState("");
  const { lobby } = useParams();
  const [err, setErr] = useState("");
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  function handleUserNameChange(e) {
    setUsername(e.target.value);
  }

  function handleLobbyNameChange(e) {
    setLobbyName(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!socket) return;

    const data = {
      name: username,
      lobbyName: lobby ? lobby : lobbyName,
      password,
    };
    socket.emit("join-lobby", JSON.stringify(data));

    socket.on("join-lobby-response", (response) => {
      const data = JSON.parse(response);
      console.log(data);
      if (data.status == "failure") {
        setErr(data.message);
        return;
      } else {
        navigate(`/game/${lobbyName || lobby}`);
      }
    });
  }
  return (
    <div className="create-lobby">
      <form className="form-card">
        <h2>Join a Lobby</h2>
        <p className="err">{err}</p>
        <div className="input-wrapper">
          <input
            onChange={handleUserNameChange}
            onFocus={() => setErr("")}
            type="text"
            placeholder="Enter user name"
          />
        </div>
        <div className="input-wrapper">
          <input
            onChange={handleLobbyNameChange}
            onFocus={() => setErr("")}
            disabled={lobby ? true : false}
            type="text"
            value={lobby && lobby}
            placeholder="Enter lobby name"
          />
        </div>
        <div className="input-wrapper">
          <input
            onChange={handlePasswordChange}
            type="password"
            placeholder="Enter lobby password"
          />
        </div>

        {(!lobby && lobbyName == "") || username == "" ? (
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
          <button onClick={handleSubmit} className="btn w-100 mt-40">
            JOIN
          </button>
        )}
      </form>
    </div>
  );
}
