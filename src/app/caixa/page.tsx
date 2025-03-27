'use client'

import { useState } from 'react';
import { useCashRegisterContext } from '@/context/CashRegisterContext'
import Modal from 'react-modal'
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Menu from "@/components/menu";
import { ModalStyles } from '@/styles/modal';
import { FiX } from 'react-icons/fi'

type Props = {
  isModalAbertura: boolean;
  isModalReforco: boolean;
  isModalFechamento: boolean;
}
// type Props = {
//   setModalAbertura: (isOpen: boolean) => void;
//   setModalReforco: (isOpen: boolean) => void;
//   setModalFechamento: (isOpen: boolean) => void;
// }

export default function Caixa({ isModalAbertura, isModalReforco, isModalFechamento }: Props) {
  const { isCashOpen, setIsCashOpen } = useCashRegisterContext()
  const [isOpenModalAbertura, setIsOpenModalAbertura] = useState(false)
  const [isOpenModalReforco, setIsOpenModalReforco] = useState(false)
  const [isOpenModalFechamento, setIsOpenModalFechamento] = useState(false)

  async function AbreCaixa() {
    setIsCashOpen(true)
    setIsOpenModalAbertura(false)
  }

  async function ReforcaCaixa() {
    setIsOpenModalReforco(false)
  }

  async function FechaCaixa() {
    setIsCashOpen(false)
    setIsOpenModalFechamento(false)
  }

  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Menu />

        <div className='flex flex-row gap-4 px-4 w-full bg-slate-50 h-10 mt-2'>
          {!isCashOpen && 
            <button 
              className='bg-slate-200 px-6 rounded border-[1px] border-slate-300' 
              onClick={()=> setIsOpenModalAbertura(true)}
            >
              Abrir Caixa
            </button>
          }

          <button 
            className='bg-slate-200 px-6 rounded border-[1px] border-slate-300' 
            onClick={()=> setIsOpenModalReforco(true)}
          >
            Reforço Caixa
          </button>
          
          {isCashOpen && 
            <button 
              className='bg-slate-200 px-6 rounded border-[1px] border-slate-300'
              onClick={()=> setIsOpenModalFechamento(true)}
            >
              Fechar Caixa
            </button>
          }
        </div>
        <div className="flex flex-1 justify-center items-start p-4">
          
          <Modal 
            style={ModalStyles} 
            ariaHideApp={false} 
            isOpen={isOpenModalAbertura}
          >
            <div className="w-full bg-slate-50 border-[1px] border-slate-200 shadow-xl shadow-slate-500 p-4 rounded-2xl">
              <div className='flex flex-row justify-between items-center w-96 h-20'>
                <h2 className="font-bold text-2xl w-full text-center">ABERTURA DE CAIXA</h2>
                <button onClick={()=> setIsOpenModalAbertura(false)} className='hover: border-[1px] hover:border-red-500 p-1 cursor-pointer'>
                  <FiX size={20} color='#ff0000' />
                </button>
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
          </Modal>

          <Modal 
            style={ModalStyles} 
            ariaHideApp={false} 
            isOpen={isOpenModalReforco}
          >
            <div className="w-full bg-slate-50 border-[1px] border-slate-200 shadow-xl shadow-slate-500 p-4 rounded-2xl">
              <div className='flex flex-row justify-between items-center w-96 h-20'>
                <h2 className="font-bold text-2xl w-full text-center">REFORÇO DE CAIXA</h2>
                <button onClick={()=> setIsOpenModalReforco(false)} className='hover: border-[1px] hover:border-red-500 p-1 cursor-pointer'>
                  <FiX size={20} color='#ff0000' />
                </button>
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
          </Modal>

          <Modal 
            style={ModalStyles} 
            ariaHideApp={false} 
            isOpen={isOpenModalFechamento}
          >
            <div className="w-full bg-slate-50 border-[1px] border-slate-200 shadow-xl shadow-slate-500 p-4 rounded-2xl">
              <div className='flex flex-row justify-between items-center w-96 h-20'>
                <h2 className="font-bold text-2xl w-full text-center">FECHAMENTO DE CAIXA</h2>
                <button onClick={()=> setIsOpenModalFechamento(false)} className='hover: border-[1px] hover:border-red-500 p-1 cursor-pointer'>
                  <FiX size={20} color='#ff0000' />
                </button>
              </div>
              <form className="flex flex-col gap-6 w-full justify-center p-2">
                <Button type='button' onClick={FechaCaixa}>
                  Fechar Caixa
                </Button>
              </form>
            </div>
          </Modal>

        </div>
      </div>

    </div>
  )
}