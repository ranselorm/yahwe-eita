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
  // setReferenceCode: (code: string) => void;
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [sponsorId, setSponsorId] = useState<number>(0);

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
