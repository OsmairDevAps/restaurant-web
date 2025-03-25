'use client'
import { useState } from "react";
import Caixa from "./caixa/page"
import SignIn from "./sign-in/page"

export default function Root() {
  const [isLogged, setIsLogged] = useState(false)

  if (isLogged) return <Caixa />
  return <SignIn />
}
