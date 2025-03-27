"use client";

import { createContext, useContext, useState } from "react";

interface CashRegisterContextType {
  isCashOpen: boolean;
  setIsCashOpen: (value: boolean) => void;
}

const CashRegisterContext = createContext<CashRegisterContextType | null>(null);

export function CashRegisterProvider({ children }: { children: React.ReactNode }) {
  const [isCashOpen, setIsCashOpen] = useState(false);

  return (
    <CashRegisterContext.Provider value={{ isCashOpen, setIsCashOpen }}>
      {children}
    </CashRegisterContext.Provider>
  );
}

export function useCashRegisterContext() {
  const context = useContext(CashRegisterContext);
  if (!context) throw new Error("useCashRegisterContext must be used within CashRegisterProvider");
  return context;
}
