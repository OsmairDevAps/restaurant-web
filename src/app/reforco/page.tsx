'use client'

import Header from "@/components/header";
import Menu from "@/components/menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Reforco() {

  async function ReforcaCaixa() {
    alert('Ok, reforçado kkk')
  }

  return(
    <div className="h-screen w-screen flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Menu />
        <div className="p-4">
          <div className='flex flex-row justify-between items-center w-full h-10'>
            <h2 className="font-bold text-2xl w-full text-center">REFORÇAR O CAIXA</h2>
          </div>
          <form className="flex flex-col gap-6 w-full justify-center p-2">
            <div className="flex flex-col gap-2 my-2">
              <label htmlFor="saldoini" className="font-semibold">Valor do reforço:</label>
              <Input 
                id="saldoini" 
                name="saldoini" 
                type="text" 
                defaultValue="0,00"
              />
            </div>
            <Button type='button' onClick={ReforcaCaixa}>
              Reforçar Caixa
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}