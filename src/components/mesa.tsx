'use client'
import { useRouter } from "next/navigation";

type TMesa = {
  num: number;
  color: string;
}

export default function Mesa({ num, color }: TMesa) {
  const router = useRouter()

  function handleClick(val: number) {
    router.push(`atender/${val}`)
  }
  
  return (
    <button onClick={() => handleClick(num)}>
      <div className={`flex flex-col justify-center items-center w-32 h-32 bg-${color}-200 border-[1px] border-slate-300`}>
        <span className="text-slate-950 font-bold text-2xl">{num}</span>
      </div>
    </button>
 )
}