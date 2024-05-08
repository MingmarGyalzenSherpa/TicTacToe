import React from "react";

export default function GameCard({ title, user }) {
  return (
    <div className="game-card">
      <p className="game-card-title">{title}</p>
      <p className="game-card-desc">{user}'s waiting</p>
    </div>
  );
}
