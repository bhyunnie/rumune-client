import React, { createContext, useState } from "react";
type Props = {
  children?: JSX.Element | JSX.Element[];
};

type ModalContextType = {
  modalList: string[];
  setModalList: (modalList: string[] | ((prev: string[]) => string[])) => void;
};

export const ModalContext = createContext<ModalContextType>({
  modalList: [],
  setModalList: () => {},
});

export const ModalContextProvider: React.FC<Props> = ({
  children,
}: Props): JSX.Element => {
  const [modalList, setModalList] = useState<string[]>([]);
  return (
    <ModalContext.Provider value={{ modalList, setModalList }}>
      {children}
    </ModalContext.Provider>
  );
};
