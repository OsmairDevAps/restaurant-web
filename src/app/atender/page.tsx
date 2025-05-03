'use client'
import Header from "@/components/header"
import Menu from "@/components/menu";
import Mesa from "@/components/mesa"
import { useMesa } from "@/hooks/useMesa";
import { IMesa } from "@/utils/interface";
import { useEffect, useState } from "react";

export default function Atender() {
  const mesaDatabase = useMesa()
  const [mesas, setMesas] = useState<IMesa[]>([])

  async function loadMesas() {
    const response = await mesaDatabase.listar()
    if (response) {
      setMesas(response)
    }
  }

  useEffect(() => {
    loadMesas()
  }, [])

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
              mesas.map(mesa => (
                <Mesa
                  key={mesa.id}
                  mesa={mesa}
                />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}