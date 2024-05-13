import React from "react";

export default function GameCard({ title, user, status }) {
  return (
    <div className="game-card">
      <p className="game-card-title">{title}</p>
      <p className="game-card-desc">
        {status == "open" ? `${user}'s waiting` : "Match ongoing"}
      </p>
    </div>
  );
}
