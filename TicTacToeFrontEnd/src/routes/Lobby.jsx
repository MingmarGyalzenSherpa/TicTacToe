import React, { useContext, useEffect, useState } from "react";
import GameCard from "../Components/GameCard";
import { SocketContext } from "../context/socketContext";
import { useNavigate } from "react-router-dom";

export default function Lobby() {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const [lobbies, setLobbies] = useState([]);
  useEffect(() => {
    if (!socket) return;
    socket.emit("browse-lobbies");
    socket.on("browse-lobby-response", (response) => {
      console.log("haha");
      console.log(response);
      const data = JSON.parse(response);
      setLobbies(data);
    });
  }, [socket]);

  const handleLobbyClick = (lobbyName) => {
    navigate(`/join-lobby/${lobbyName}`);
  };

  return (
    <div className="lobby-page">
      <h1>Lobbies</h1>
      <div className="lobbies">
        {lobbies.map((lobby) => (
          <GameCard
            handleLobbyClick={handleLobbyClick}
            key={lobby.name}
            title={lobby.name}
            user={lobby.players[0]}
            status={lobby.status}
          />
        ))}
      </div>
    </div>
  );
}
