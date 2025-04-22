'use client'

import { IMesa } from "@/utils/interface";
import { useRouter } from "next/navigation";

type TMesa = {
  mesa: IMesa;
}

export default function Mesa({ mesa }: TMesa) {
  const router = useRouter()

  function handleClick(id: number) {
    router.push(`atender/${id}`)
  }
  
  return (
    <button onClick={() => handleClick(mesa.id)} className="cursor-pointer">
      <div className={`flex flex-col justify-center items-center w-32 h-32 bg-${mesa.cor}-200 border-[1px] border-slate-300`}>
        <span className="text-slate-950 font-bold text-2xl">{mesa.num}</span>
      </div>
    </button>
 )
}