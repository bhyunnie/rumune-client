import React, { ReactNode } from "react";
import "./Modal.css";

const Modal = (props: { children: ReactNode }) => {
  return (
    <React.Fragment>
      <div id="modal">{props.children}</div>
    </React.Fragment>
  );
};

export default Modal;
