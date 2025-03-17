import React, { createContext, useContext, useState, ReactNode } from "react";
import { getUserData, saveUserData, clearUserData } from "@/utils";

interface User {
  id: number;
  name: string;
  email: string;
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

  // Function to update user state globally and save to storage
  const loginUser = async (userData: User) => {
    setUser(userData);
    await saveUserData(userData);
  };

  // Logout function
  const logout = async () => {
    setUser(null);
    await clearUserData();
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
