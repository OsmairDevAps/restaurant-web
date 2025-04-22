"use client";

import { createContext, useContext, useState } from "react";
import { IUsuario } from "@/utils/interface";

interface AuthContextType {
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
  usuario: IUsuario;
  setUsuario: (usuario: IUsuario) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLogged, setIsLogged] = useState(false);
  const [usuario, setUsuario] = useState<IUsuario>({} as IUsuario);

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, usuario, setUsuario }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used within AuthProvider");
  return context;
}
