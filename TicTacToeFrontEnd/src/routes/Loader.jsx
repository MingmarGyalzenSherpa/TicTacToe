import React, { useContext, useEffect } from "react";
import { SocketContext } from "../context/socketContext";
import { useNavigate, useParams } from "react-router-dom";

export default function Loader() {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const { gameID } = useParams();

  useEffect(() => {
    console.log(gameID);
    if (!socket) return;
    socket.on("waiting-player-response", (response) => {
      navigate(`/game/${gameID}`);
    });
    socket.on("cancel-response", (response) => {
      const data = JSON.parse(response);
      if (data.status == "success") {
        navigate("/");
      }
    });
  }, []);

  function handleCancel() {
    console.log(socket);
    socket.emit("cancel");
  }

  return (
    <div className="loader">
      <h1>Waiting for other player to join</h1>
      <button onClick={handleCancel} className="btn danger">
        Cancel
      </button>
    </div>
  );
}
