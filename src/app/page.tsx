'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import Caixa from "./caixa/page"
import SignIn from "./sign-in/page"

export default function Root() {
  const [isLogged, setIsLogged] = useState(true)

  if (isLogged) return <Caixa />
  return <SignIn />
}
