import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserContextProvider } from "./context/UserContext";
import React from "react";

const root = ReactDOM.createRoot(
  document.getElementById("rumune") as HTMLElement
);

const bindContext = (children: any) => {
  return (
    <React.Fragment>
      <UserContextProvider>{children}</UserContextProvider>
    </React.Fragment>
  );
};

root.render(bindContext(<App />));
