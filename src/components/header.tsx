'use client'

import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { FaSignOutAlt } from 'react-icons/fa'
import logotipo from '@/assets/logotipo.png'
import Image from "next/image";

export default function Header() {
  const { isLogged, setIsLogged, user } = useAuthContext()
  const router = useRouter()

  function handleSignOut() {
    setIsLogged(false)
    router.replace('/')
  }

  return (
    <header className="bg-slate-950 h-16 flex items-center justify-between p-4 border-b-[1px] border-b-slate-300">
      <Image alt="Tio do Crepe" src={logotipo} className="w-20 h-20" />
      
      <div className="flex flex-row gap-4">
        <div className="h-10 w-10 rounded-full bg-slate-300"></div>
        <div className="flex flex-col">
          <span className="text-[12px] text-white">{user.user}</span>
          <span className="text-[12px] text-white">{user.kind}</span>
        </div>
        <button onClick={handleSignOut} className="p-2">
          <FaSignOutAlt size={18} color="#ffffff" />
        </button>
      </div>
    </header>
  )
}