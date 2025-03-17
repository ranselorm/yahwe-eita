import React, { createContext, useContext, useState, ReactNode } from "react";
import { getUserData, saveUserData, clearUserData } from "@/utils";

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
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // ✅ FIX: Make `setUser` synchronous
  const loginUser = (userData: User | null) => {
    if (userData) {
      setUser(userData); // Update state synchronously
    } else {
      setUser(null);
    }
  };

  // ✅ FIX: Logout remains synchronous, handling async separately
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser: loginUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
