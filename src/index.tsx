import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserContextProvider } from "./context/UserContext";
import React from "react";
import { ModalContextProvider } from "./context/ModalContext";

const root = ReactDOM.createRoot(
  document.getElementById("rumune") as HTMLElement
);

const bindContext = (children: any) => {
  return (
    <React.Fragment>
      <UserContextProvider>
        <ModalContextProvider>{children}</ModalContextProvider>
      </UserContextProvider>
    </React.Fragment>
  );
};

root.render(bindContext(<App />));
