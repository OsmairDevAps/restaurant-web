'use client'
import { useState } from "react";
import Caixa from "./caixa/page"
import SignIn from "./sign-in/page"
import { useAppContext } from "@/context/AppContext";

export default function Root() {
  const { isLogged } = useAppContext()

  if (isLogged) return <Caixa />
  return <SignIn />
}
