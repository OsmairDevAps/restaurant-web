'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { FaConciergeBell, FaCashRegister, FaSignOutAlt } from 'react-icons/fa'

export default function Header() {
  const { isLogged, setIsLogged, user } = useAppContext()
  const router = useRouter()

  function handleSignOut() {
    setIsLogged(false)
    router.replace('/')
  }

  return (
    <header className="h-16 flex items-center justify-between bg-slate-100 p-4 mb-2 border-b-[1px] border-b-slate-300">
      <div className="h-10 w-16 bg-slate-300"></div>
      
      <div className="flex gap-2">
        <div>
          <Link href="/caixa" className="flex flex-row gap-2 w-40">
            <FaCashRegister size={20} /> CAIXA
          </Link>
        </div>
        <div>
          <Link href="/atender" className="flex flex-row gap-2 w-40">
            <FaConciergeBell size={20} /> ATENDER
          </Link>
        </div>
      </div>
      
      <div className="flex flex-row gap-4">
        <div className="h-10 w-10 rounded-full bg-slate-300"></div>
        <div className="flex flex-col">
          <span className="text-[12px]">{user.user}</span>
          <span className="text-[12px]">{user.kind}</span>
        </div>
        <button onClick={handleSignOut}>
          <FaSignOutAlt size={18} color="#990000" />
        </button>
      </div>
    </header>
  )
}