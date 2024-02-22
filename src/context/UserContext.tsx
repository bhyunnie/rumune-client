import React, { createContext, useState } from "react";
type Props = {
  children?: JSX.Element | JSX.Element[];
};

type User = {
  username?: string;
  email?: string;
  profileImage?: string;
  deprecated?: boolean;
  createdAt?: string;
  provider?: string;
  providerId?: string;
  userId?: number;
  authorities?: Array<any>;
};

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
};

export const UserContext = createContext<UserContextType>({
  user: {},
  setUser: () => {},
});

export const UserContextProvider: React.FC<Props> = ({
  children,
}: Props): JSX.Element => {
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
