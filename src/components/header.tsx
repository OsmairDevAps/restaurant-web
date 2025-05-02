'use client'

import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { FaSignOutAlt } from 'react-icons/fa'
import logotipo from '@/assets/logotipo.png'
import Image from "next/image";
import fotoDefault from "@/assets/logotipo.png"
import { FiMoon, FiSun } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function Header() {
  const Icone = FaSignOutAlt as unknown as React.FC<{ size?: number; color?: string }>;
  const { isLogged, setIsLogged, usuario } = useAuthContext()
  const [horaAtual, setHoraAtual] = useState('');
  const [isDay, setIsDay] = useState(true);
  const [dataAtual, setDataAtual] = useState('')
  const router = useRouter()

  function handleSignOut() {
    setIsLogged(false)
    router.replace('/')
  }

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Hora
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      // Data
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = now.getFullYear();
      setDataAtual(`${day}/${month}/${year}`);
      setHoraAtual(`${hours}:${minutes}`);
      setIsDay(now.getHours() >= 6 && now.getHours() < 18);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000); // atualiza a cada minuto
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-slate-950 h-16 flex items-center justify-between p-4 border-b-[1px] border-b-slate-300">
      <Image alt="Tio do Crepe" src={logotipo} className="w-20 h-20" />
      
      <div className="flex flex-row gap-16">
        <div className="flex flex-row gap-4 justify-center items-center">
          {isDay ? <FiSun size={24} color="#FFFFFF" /> : <FiMoon size={24} color="#FFFFFF" />}
          <div className="flex flex-col justify-center items-center">
            <span className="text-white text-2xl font-regular">{horaAtual}</span>
            <span className="text-white text-sm">{dataAtual}</span>
          </div>
        </div>

        <div className="flex flex-row gap-4 justify-center items-center">
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
      </div>
    </header>
  )
}