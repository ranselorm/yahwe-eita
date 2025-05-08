import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: number;
  isLoggedIn: boolean;
  name: string;
  email: string;
  picture: string;
  exp: string;
  token: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  sponsorId: number;
  setSponsorId: (id: number) => void;
  accessToken: string;
  setAccessToken: (token: string) => void;
  globalEmail: string;
  setGlobalEmail: (email: string) => void;
  globalPassword: string;
  setGlobalPassword: (password: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [sponsorId, setSponsorId] = useState<number>(0);
  const [accessToken, setAccessToken] = useState<string>("");
  const [globalEmail, setGlobalEmail] = useState<string>("");
  const [globalPassword, setGlobalPassword] = useState<string>("");

  const loginUser = (userData: User | null) => {
    if (userData) {
      setUser(userData);
    } else {
      setUser(null);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: loginUser,
        logout,
        sponsorId,
        setSponsorId,
        accessToken,
        setAccessToken,
        globalEmail,
        setGlobalEmail,
        globalPassword,
        setGlobalPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
