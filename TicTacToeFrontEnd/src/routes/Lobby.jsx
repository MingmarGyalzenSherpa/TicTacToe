import React, { useContext, useEffect, useState } from "react";
import GameCard from "../Components/GameCard";
import { SocketContext } from "../context/socketContext";

export default function Lobby() {
  const socket = useContext(SocketContext);
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

  return (
    <div className="lobby-page">
      <h1>Lobbies</h1>
      <div className="lobbies">
        {lobbies.map((lobby) => (
          <GameCard
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
