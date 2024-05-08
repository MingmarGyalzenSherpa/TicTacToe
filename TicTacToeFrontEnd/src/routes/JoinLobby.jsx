import React from "react";
import { Link } from "react-router-dom";

export default function JoinLobby() {
  return (
    <div className="create-lobby">
      <form className="form-card">
        <h2>Join a Lobby</h2>
        <div className="input-wrapper">
          <input type="password" placeholder="Enter lobby name" />
        </div>
        <div className="input-wrapper">
          <input type="password" placeholder="Enter lobby password" />
        </div>

        <Link to={"/"} className="btn w-100 mt-40">
          CREATE
        </Link>
      </form>
    </div>
  );
}
