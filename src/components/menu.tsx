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

export default function Menu() {
  const { isCashOpen, setIsCashOpen } = useCashRegisterContext()
  const router = useRouter()

  return (
    <div className="flex flex-col w-32 items-center h-full pt-6 pl-2 pr-2 gap-6 bg-slate-100 border-r-[1px] border-r-slate-300">
    <div>
      <Link href="/" className="flex flex-col items-center justify-center w-40 text-slate-600">
        <Image src={home} alt="Home" className="w-10 h-10" />
        <span className="text-md">Home</span>
      </Link>
    </div>

    <div>
      {isCashOpen ? 
      <div className='flex flex-col items-center justify-center w-40 text-slate-600'>
        <Image src={abrircx} alt="Abrir Caixa" className="w-10 h-10 bg-slate-500" />
        <span className="text-md">Abrir Caixa</span>
      </div>
      :
      <Link href="/" className='flex flex-col items-center justify-center w-40 text-slate-600'>
        <Image src={abrircx} alt="Abrir Caixa" className="w-10 h-10" />
        <span className="text-md">Abrir Caixa</span>
      </Link>
      }
    </div>

    <div>
      <Link href="/" className="flex flex-col items-center justify-center w-40 text-slate-600">
        <Image src={reforcarcx} alt="Reforçar Caixa" className="w-10 h-10" />
        <span className="text-md">Reforçar Caixa</span>
      </Link>
    </div>

    <div>
      <Link href="/" className="flex flex-col items-center justify-center w-40 text-slate-600">
        <Image src={fecharcx} alt="Fechar Caixa" className="w-10 h-10" />
        <span className="text-md">Fechar Caixa</span>
      </Link>
    </div>

    <div>
      <Link href="/atender" className="flex flex-col items-center justify-center w-40 text-slate-600">
        <Image src={atender} alt="Atender" className="w-10 h-10" />
        <span className="text-md">Atender</span>
      </Link>
    </div>

    <div>
      <Link href="/caixa" className="flex flex-col items-center justify-center w-40 text-slate-600">
        <Image src={relatorio} alt="Relatórios" className="w-10 h-10" />
        <span className="text-md">Relatórios</span>
      </Link>
    </div>

    <div>
      <Link href="/configuracao" className="flex flex-col items-center justify-center w-40 text-slate-600">
        <Image src={configuracao} alt="Configurações" className="w-10 h-10" />
        <span className="text-md">Configurações</span>
      </Link>
    </div>
  </div>

  )
}