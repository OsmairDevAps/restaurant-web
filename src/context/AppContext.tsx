"use client";

import { IUser } from "@/utils/interface";
import { createContext, useContext, useState } from "react";

const AppContext = createContext<any>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState<IUser>({} as IUser)

  return (
    <AppContext.Provider value={{ isLogged, setIsLogged, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
