import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import Lobby from "./routes/Lobby.jsx";
import Home from "./routes/Home.jsx";
import CreateLobby from "./routes/CreateLobby.jsx";
import JoinLobby from "./routes/JoinLobby.jsx";
import { SocketContextProvider } from "./context/socketContext.jsx";
import Game from "./routes/Game.jsx";
import Loader from "./routes/Loader.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create-lobby",
    element: <CreateLobby />,
  },
  {
    path: "/join-lobby",
    element: <JoinLobby />,
  },
  {
    path: "/browse-lobby",
    element: <Lobby />,
  },
  {
    path: "/game/:gameID",
    element: <Game />,
  },
  {
    path: "/loader/:gameID",
    element: <Loader />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <SocketContextProvider>
    <RouterProvider router={router} />
  </SocketContextProvider>
);
