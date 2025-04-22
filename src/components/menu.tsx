'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCashRegisterContext } from '@/context/CashRegisterContext'
import Image from "next/image";
import home from '@/assets/home.png'
import atender from '@/assets/food.png'
import fecharcx from '@/assets/cash-closed.png'
import abrircx from '@/assets/cash-open.png'
import reforcarcx from '@/assets/money.png'
import configuracao from '@/assets/setting.png'
import relatorio from '@/assets/sheet.png'
import { FaCashRegister, FaChartBar, FaCog, FaHeadset, FaHome, FaLock, FaMoneyCheckAlt } from "react-icons/fa";

export default function Menu() {
  const { isCashOpen, setIsCashOpen } = useCashRegisterContext()
  const IconHome = FaHome as unknown as React.FC<{ size?: number; color?: string; className?:string; }>;
  const IconLock = FaLock as unknown as React.FC<{ size?: number; color?: string; className?:string; }>;
  const IconMoneyCheckAlt = FaMoneyCheckAlt as unknown as React.FC<{ size?: number; color?: string; className?:string; }>;
  const IconCashRegister = FaCashRegister as unknown as React.FC<{ size?: number; color?: string; className?:string; }>;
  const IconHeadset = FaHeadset as unknown as React.FC<{ size?: number; color?: string; className?:string; }>;
  const IconChartBar = FaChartBar as unknown as React.FC<{ size?: number; color?: string; className?:string; }>;
  const IconCog = FaCog as unknown as React.FC<{ size?: number; color?: string; className?:string; }>;
  const router = useRouter()

  function openCash() {
    router.push('caixa')
  }

  function closeCash() {
    router.push('caixa')
  }

  return (
    <div className="flex flex-col w-32 items-center h-full pt-6 pl-2 pr-2 gap-6 bg-slate-100 border-r-[1px] border-r-slate-300">
    <div>
      <Link href="/dashboard" className="flex flex-col items-center justify-center w-40 text-slate-600">
        <IconHome className="w-10 h-10 text-slate-950 hover:text-slate-500 hover:cursor-pointer" />
        <span className="text-md text-slate-950 hover:cursor-pointer">Home</span>
      </Link>
    </div>

    <div>
      {isCashOpen ? 
        <div>
          <button onClick={closeCash} className="flex flex-col items-center justify-center w-40 text-slate-600 mb-4">
            <IconLock className="w-10 h-10 text-slate-950 hover:text-slate-500 hover:cursor-pointer" />
            <span className="text-md text-slate-950 hover:cursor-pointer">Fechar Caixa</span>
          </button>
          <Link href='/reforco' className="flex flex-col items-center justify-center w-40 text-slate-600">
            <IconMoneyCheckAlt className="w-10 h-10 text-slate-950 hover:text-slate-500 hover:cursor-pointer" />
            <span className="text-md text-slate-950 hover:cursor-pointer">Reforçar Caixa</span>
          </Link>
        </div>
      :
      <button onClick={openCash} className='flex flex-col items-center justify-center w-40 text-slate-600'>
          <IconCashRegister className="w-10 h-10 text-slate-950 hover:text-slate-500 hover:cursor-pointer" />
          <span className="text-md text-slate-950 hover:cursor-pointer">Abrir Caixa</span>
        </button>
      }
    </div>


    <div>
      <Link href="/atender" className="flex flex-col items-center justify-center w-40 text-slate-600">
        <IconHeadset className="w-10 h-10 text-slate-950 hover:text-slate-500 hover:cursor-pointer" />
        <span className="text-md text-slate-950 hover:cursor-pointer">Atender</span>
      </Link>
    </div>

    <div>
      <Link href="/relatorio" className="flex flex-col items-center justify-center w-40 text-slate-600">
        <IconChartBar className="w-10 h-10 text-slate-950 hover:text-slate-500 hover:cursor-pointer" />
        <span className="text-md text-slate-950 hover:cursor-pointer">Relatórios</span>
      </Link>
    </div>

    <div>
      <Link href="/configuracao" className="flex flex-col items-center justify-center w-40 text-slate-600">
        <IconCog className="w-10 h-10 text-slate-950 hover:text-slate-500 hover:cursor-pointer" />
        <span className="text-md text-slate-950 hover:cursor-pointer">Configurações</span>
      </Link>
    </div>
  </div>

  )
}