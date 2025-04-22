'use client'

import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { FaSignOutAlt } from 'react-icons/fa'
import logotipo from '@/assets/logotipo.png'
import Image from "next/image";
import fotoDefault from "@/assets/logotipo.png"

export default function Header() {
  const { isLogged, setIsLogged, usuario } = useAuthContext()
  const router = useRouter()

  function handleSignOut() {
    setIsLogged(false)
    router.replace('/')
  }

  const Icone = FaSignOutAlt as unknown as React.FC<{ size?: number; color?: string }>;

  return (
    <header className="bg-slate-950 h-16 flex items-center justify-between p-4 border-b-[1px] border-b-slate-300">
      <Image alt="Tio do Crepe" src={logotipo} className="w-20 h-20" />
      
      <div className="flex flex-row gap-4">
        <div className="flex justify-center items-center h-12 w-12 rounded-full bg-slate-600">
          {usuario.foto ? 
            <Image alt="Usuário Logado" src={usuario.foto} className="w-10 h-10" /> :
            <Image alt="Usuário Logado" src={fotoDefault} className="w-10 h-10" /> 
          }
        </div>
        <div className="flex flex-col">
          <span className="text-[12px] text-white">{usuario.nomeusuario}</span>
          <span className="text-[12px] text-white">{usuario.tipo}</span>
        </div>
        <button onClick={handleSignOut} className="p-2">
          <Icone size={18} color="#ffffff" />
        </button>
      </div>
    </header>
  )
}