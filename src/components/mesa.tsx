'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type TMesa = {
  isOpen: boolean;
  num: number;
  price: number;
  status: string;
}

export default function Mesa({ isOpen, num, price, status }: TMesa) {
  const router = useRouter()
  const [colorTable, setColorTable] = useState('blue')

  function handleClick(val: number) {
    router.push(`atender/${val}`)
  }
  
  useEffect(()=> {
    let cor 
    switch (status) {
      case 'disponivel':
        cor = 'blue'
        break;
      case 'ocupada':
        cor = 'orange'
        break;
      case 'reservada':
        cor = 'yellow'
        break;
      case 'cortesia':
        cor = 'violet'
        break;
      default:
        cor = 'blue'
        break;
    }
    setColorTable(cor)
  },[status])
  
  return (
    <button onClick={() => handleClick(num)}>
      <div className={`flex flex-col justify-center items-center w-32 h-32 bg-${colorTable}-200 border-[1px] border-slate-300`}>
        <span className="text-slate-950 font-bold text-2xl">{num}</span>
        <span>
          {status ==='ocupada' && Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(price)}
        </span>
      </div>
    </button>
 )
}