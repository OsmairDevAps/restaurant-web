'use client'
import Header from "@/components/header"
import Menu from "@/components/menu";
import Mesa from "@/components/mesa"
import { useCommand } from "@/hooks/useCommand";
import { ICommand } from "@/utils/interface";
import { useEffect, useState } from "react";

interface IMesa {
  num: number;
  price: number;
  status: string;
}

export default function Atender() {
  const commandDatabase = useCommand()
  const [commands, setCommands] = useState<ICommand[]>([])
  const mesas = [
    { num: 1, price: 30, status: 'ocupada' },
    { num: 2, price: 0, status: 'disponivel' },
    { num: 3, price: 430, status: 'ocupada' },
    { num: 4, price: 850, status: 'ocupada' },
    { num: 5, price: 0, status: 'disponivel' },
    { num: 6, price: 0, status: 'disponivel' },
    { num: 7, price: 0, status: 'cortesia' },
    { num: 8, price: 0, status: 'disponivel' },
    { num: 9, price: 0, status: 'disponivel' },
    { num: 10, price: 0, status: 'disponivel' },
    { num: 11, price: 0, status: 'reservada' },
    { num: 12, price: 0, status: 'disponivel' },
    { num: 13, price: 0, status: 'disponivel' },
    { num: 14, price: 0, status: 'disponivel' },
    { num: 15, price: 0, status: 'disponivel' },
  ];

  async function loadCommands() {
    const response = await commandDatabase.list()
    if(response) {
      setCommands(response)
    }
  }

  useEffect(() => {
    loadCommands()
  },[])

  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Menu />

        <div className="p-4">
          <div className="flex flex-row justify-between mb-4">
            <h2 className="mb-2 font-bold text-xl">Informe a mesa:</h2>
            <div className="flex flex-row justify-start items-center gap-6">
              <div className="flex flex-row justify-start items-center gap-2">
                <div className="w-6 h-6 bg-blue-200"></div>
                <span>Disponível</span>
              </div>
              <div className="flex flex-row justify-start items-center gap-2">
                <div className="w-6 h-6 bg-orange-200"></div>
                <span>Ocupada</span>
              </div>
              <div className="flex flex-row justify-start items-center gap-2">
                <div className="w-6 h-6 bg-yellow-200"></div>
                <span>Reservada</span>
              </div>
              <div className="flex flex-row justify-start items-center gap-2">
                <div className="w-6 h-6 bg-violet-200"></div>
                <span>Cortesia</span>
              </div>
            </div>
          </div>

          <div className="flex flex-row flex-wrap justify-start items-start w-full gap-8">
            {
              commands.map(mesa => (
                <Mesa 
                  key={mesa.id}
                  num={mesa.num} 
                  color={mesa.color}
                />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}