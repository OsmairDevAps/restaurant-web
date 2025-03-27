"use client";

import { AuthProvider } from "./AuthContext"; 
import { CashRegisterProvider } from "./CashRegisterContext";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CashRegisterProvider>{children}</CashRegisterProvider>
    </AuthProvider>
  );
}
