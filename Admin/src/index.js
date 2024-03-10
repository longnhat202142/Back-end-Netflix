import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/authContext/authContext";
import { MovieContextProvider } from "./context/movieContext/movieContext";
import { ListContextProvider } from "./context/listContext/listContext";
import { UserContextProvider } from "./context/userContext/userContext";
ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <MovieContextProvider>
          <ListContextProvider>
            <App />
          </ListContextProvider>
        </MovieContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
