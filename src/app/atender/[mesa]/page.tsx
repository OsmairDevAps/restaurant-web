'use client'

import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"

export default function DetalheMesa() {
  const params = useParams()
  const router = useRouter()
  const { mesa } = params

  function handleBack() {
    router.push('/atender')
  }

  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />

      <h2 className="px-4 font-bold text-xl">MESA {mesa}</h2>
      
      <div className="w-full flex flex-row gap-4 h-full justify-start items-start p-4">
        <div className="w-1/2 h-full flex flex-col justify-between items-start">
          <div className="flex flex-row justify-between w-full h-full mb-6 bg-slate-100">
            <div className="flex flex-col w-1/3 p-4 gap-2">
              <button className="bg-purple-300 w-48 h-10">Categoria 01</button>
              <button className="bg-purple-300 w-48 h-10">Categoria 02</button>
              <button className="bg-purple-300 w-48 h-10">Categoria 03</button>
              <button className="bg-purple-300 w-48 h-10">Categoria 04</button>
            </div>
            {/* Produtos da categoria selecionada */}
            <div className="flex-wrap w-2/3 p-4 gap-2">
              <button className="bg-indigo-300 w-60 h-10 m-1">Product 01</button>
              <button className="bg-indigo-300 w-60 h-10 m-1">Product 02</button>
              <button className="bg-indigo-300 w-60 h-10 m-1">Product 03</button>
              <button className="bg-indigo-300 w-60 h-10 m-1">Product 04</button>
              <button className="bg-indigo-300 w-60 h-10 m-1">Product 05</button>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <Button className="w-60" onClick={handleBack}>Voltar</Button>
            <Button className="w-60">Finalizar Atendimento</Button>
          </div>
        </div>

        <div className="w-1/2 h-full p-4 flex flex-col justify-start items-start bg-slate-100">
          <h2 className="my-2 font-bold text-lg">Pedido da mesa</h2>
          
          <div className="w-full border-[1px] border-slate-300 bg-slate-300 p-2 my-1">
            <h2 className="font-bold">Categoria 01</h2>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row justify-between items-center w-full">
                <span>Item 01</span>
                <span>R$ 0,00</span>
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                <span>Item 02</span>
                <span>R$ 0,00</span>
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                <span className="font-semibold">Sub-total:</span>
                <span>R$ 0,00</span>
              </div>
            </div>
          </div>

          <div className="w-full border-[1px] border-slate-300 bg-slate-300 p-2 my-1">
            <h2 className="font-bold">Categoria 03</h2>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row justify-between items-center w-full">
                <span>Item 01</span>
                <span>R$ 0,00</span>
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                <span>Item 02</span>
                <span>R$ 0,00</span>
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                <span className="font-semibold">Sub-total:</span>
                <span>R$ 0,00</span>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center bg-slate-300 w-full p-2 mt-1">
            <span className="font-bold text-lg">TOTAL</span>
            <span className="font-bold text-lg">R$ 0,00</span>
          </div>
        </div>
      </div>
    </div>
  )
}