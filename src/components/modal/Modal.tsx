import React, { ReactNode, useContext, useEffect } from "react";
import "./Modal.css";
import { ModalContext } from "../../context/ModalContext";

const Modal = (props: { children: ReactNode }) => {
  const modalCtx = useContext(ModalContext);
  useEffect(() => {
    modalCtx.setModalList((prev: string[]) => {
      return [...prev, "modal"]; // 이거 ModalContext로 옮겨야함
    });
  }, []);
  return (
    <React.Fragment>
      <div id="modal">{props.children}</div>
    </React.Fragment>
  );
};

export default Modal;
