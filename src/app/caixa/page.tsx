'use client'

import { useCashRegisterContext } from '@/context/CashRegisterContext'
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Menu from "@/components/menu";

export default function Caixa() {
  const { isCashOpen, setIsCashOpen } = useCashRegisterContext()

  async function AbreCaixa() {
    //salva valor no banco
    setIsCashOpen(true)
  }

  async function FechaCaixa() {
    //salva valor no banco
    setIsCashOpen(false)
  }

  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Menu />

        {isCashOpen ?
          <div className="p-4">
            <div className='flex flex-row justify-center items-center w-full h-10'>
              <h2 className="font-bold text-2xl w-full text-center">FECHAMENTO DE CAIXA</h2>
            </div>
            <form className="flex flex-col gap-6 w-full justify-center p-2">
              <Button type='button' onClick={FechaCaixa}>Fechar Caixa</Button>
            </form>
          </div>
        :
          <div className="p-4">
            <div className='flex flex-row justify-center items-center w-full h-10'>
              <h2 className="font-bold text-2xl w-full text-center">ABERTURA DE CAIXA</h2>
            </div>
            <form className="flex flex-col gap-6 w-full justify-center p-2">
              <div className="flex flex-col gap-2 my-2">
                <label htmlFor="saldoini" className="font-semibold">Saldo Inicial:</label>
                <Input 
                  id="saldoini" 
                  name="saldoini" 
                  type="text" 
                  defaultValue="0,00"
                />
                <span>Informe os valores disponíveis em caixa</span>
              </div>
              <Button type='button' onClick={AbreCaixa}>Abrir Caixa</Button>
            </form>
          </div>
        }
      </div>

    </div>
  )
}