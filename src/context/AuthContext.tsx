"use client";

import { createContext, useContext, useState } from "react";
import { IUser } from "@/utils/interface";

interface AuthContextType {
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
  user: IUser;
  setUser: (user: IUser) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<IUser>({} as IUser);

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used within AuthProvider");
  return context;
}
