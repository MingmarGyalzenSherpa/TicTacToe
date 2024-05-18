import React from "react";

export default function GameCard({ title, user, status, handleLobbyClick }) {
  return (
    <div
      className="game-card"
      onClick={() => {
        status == "open" && handleLobbyClick(title);
      }}
    >
      <p className="game-card-title">{title}</p>
      <p className="game-card-desc">
        {status == "open" ? `${user}'s waiting` : "Match ongoing"}
      </p>
    </div>
  );
}
