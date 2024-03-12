import React, { ReactNode, createContext, useEffect, useState } from "react";
type Props = {
  children?: JSX.Element | JSX.Element[];
};

type ModalContextType = {
  modalList: ReactNode[];
  setModalList: (
    modalList: ReactNode[] | ((prev: ReactNode[]) => ReactNode[])
  ) => void;
};

export const ModalContext = createContext<ModalContextType>({
  modalList: [],
  setModalList: () => {},
});

export const ModalContextProvider: React.FC<Props> = ({
  children,
}: Props): JSX.Element => {
  const [modalList, setModalList] = useState<ReactNode[]>([]);

  const onClose = () => {
    setModalList(modalList.slice(0, modalList.length - 1));
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <ModalContext.Provider value={{ modalList, setModalList }}>
      {children}
    </ModalContext.Provider>
  );
};
