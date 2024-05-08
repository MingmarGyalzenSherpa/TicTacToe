import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Lobby from "./routes/Lobby.jsx";
import Home from "./routes/Home.jsx";
import CreateLobby from "./routes/CreateLobby.jsx";
import JoinLobby from "./routes/JoinLobby.jsx";

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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
