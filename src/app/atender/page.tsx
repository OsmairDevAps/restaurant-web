'use client'
import Header from "@/components/header"
import Mesa from "@/components/mesa"

interface IMesa {
  num: number;
  isOpen:boolean;
  price: number;
  status: string;
}

export default function Atender() {
  const mesas = [
    { num: 1, isOpen: false, price: 30, status: 'ocupada' },
    { num: 2, isOpen: true, price: 0, status: 'disponivel' },
    { num: 3, isOpen: false, price: 430, status: 'ocupada' },
    { num: 4, isOpen: false, price: 850, status: 'ocupada' },
    { num: 5, isOpen: true, price: 0, status: 'disponivel' },
    { num: 6, isOpen: true, price: 0, status: 'disponivel' },
    { num: 7, isOpen: true, price: 0, status: 'cortesia' },
    { num: 8, isOpen: true, price: 0, status: 'disponivel' },
    { num: 9, isOpen: true, price: 0, status: 'disponivel' },
    { num: 10, isOpen: true, price: 0, status: 'disponivel' },
    { num: 11, isOpen: true, price: 0, status: 'reservada' },
    { num: 12, isOpen: true, price: 0, status: 'disponivel' },
    { num: 13, isOpen: true, price: 0, status: 'disponivel' },
    { num: 14, isOpen: true, price: 0, status: 'disponivel' },
    { num: 15, isOpen: true, price: 0, status: 'disponivel' },
  ];

  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />
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

        <div className="flex flex-row justify-start w-full h-full gap-8 flex-wrap">
          {
            mesas.map(mesa => (
              <Mesa 
                key={mesa.num}
                isOpen={mesa.isOpen} 
                num={mesa.num} 
                price={mesa.price} 
                status={mesa.status}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}