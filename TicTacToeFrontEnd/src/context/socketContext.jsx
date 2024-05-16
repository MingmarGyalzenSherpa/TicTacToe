import { createContext, useEffect, useState } from "react";

export const SocketContext = createContext(null);

import React from "react";
import { io } from "socket.io-client";

export function SocketContextProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    console.log("connecting to socket");
    const socketConn = io("ws://localhost:8080");
    socketConn.on("connect", () => {
      console.log("connection successfull");
      console.log(socketConn.id);

      if (!sessionStorage.getItem("id"))
        sessionStorage.setItem("id", socketConn.id);
    });
    setSocket(socketConn);
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
