'use client'
import Caixa from "./caixa/page"
import SignIn from "./sign-in/page"
import { useAuthContext  } from "@/context/AuthContext";

export default function Root() {
  const { isLogged } = useAuthContext ()

  if (isLogged) return <Caixa />
  return <SignIn />
}
