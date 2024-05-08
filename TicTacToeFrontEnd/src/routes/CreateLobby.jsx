import React from "react";
import { Link } from "react-router-dom";

export default function CreateLobby() {
  return (
    <div className="create-lobby">
      <form className="form-card">
        <h2>Create a Lobby</h2>
        <div className="input-wrapper">
          <input type="password" placeholder="Enter your lobby name" />
        </div>
        <div className="input-wrapper">
          <input type="password" placeholder="Enter your lobby password" />
        </div>
        <p>Note: Leave password empty to create a free to join game</p>
        <Link to={"/"} className="btn w-100 mt-40">
          CREATE
        </Link>
      </form>
    </div>
  );
}
