'use client'

import Header from "@/components/header";
import Menu from "@/components/menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import RegCategory from "./categoria/page";
import RegProduct from "./produto/page";
import RegCommand from "./mesa/page";
import RegReserva from "./reserva/page";

export default function Configuracao() {
  const [categoryClicked, setCategoryClicked] = useState('')
  const [productClicked, setProductClicked] = useState('')
  const [commandClicked, setCommandClicked] = useState('')
  const [reservaClicked, setReservaClicked] = useState('')
  const [isCategoryForm, setIsCategoryForm] = useState(false)
  const [isProductForm, setIsProductForm] = useState(false)
  const [isCommandForm, setIsCommandForm] = useState(false)
  const [isReservaForm, setIsReservaForm] = useState(false)

  function handleCategoryForm() {
    setIsCategoryForm(true)
    setIsProductForm(false)
    setIsCommandForm(false)
    setIsReservaForm(false)
    setCategoryClicked('bg-slate-200')
    setProductClicked('')
    setCommandClicked('')
    setReservaClicked('')
  }
  
  function handleProductForm() {
    setIsCategoryForm(false)
    setIsProductForm(true)
    setIsCommandForm(false)
    setIsReservaForm(false)
    setCategoryClicked('')
    setProductClicked('bg-slate-200')
    setCommandClicked('')
    setReservaClicked('')
  }
  
  function handleCommandForm() {
    setIsCategoryForm(false)
    setIsProductForm(false)
    setIsCommandForm(true)
    setIsReservaForm(false)
    setCategoryClicked('')
    setProductClicked('')
    setCommandClicked('bg-slate-200')
    setReservaClicked('')
  }
  
  function handleReservaForm() {
    setIsCategoryForm(false)
    setIsProductForm(false)
    setIsCommandForm(false)
    setIsReservaForm(true)
    setCategoryClicked('')
    setProductClicked('')
    setCommandClicked('')
    setReservaClicked('bg-slate-200')
  }

  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Menu />

        <div className="w-full p-4">
          <h2 className="font-bold">CONFIGURAÇÕES:</h2>
          <div className="flex flex-row gap-2">
            
            <div className="flex flex-col justify-items-start items-start w-96 gap-2 my-2">
              <button onClick={handleCategoryForm} className={`w-48 flex justify-start items-center p-2 hover:bg-slate-200 ${categoryClicked}`}>
                Cadastro de Categorias
              </button>
              <button onClick={handleProductForm} className={`w-48 flex justify-start items-center p-2 hover:bg-slate-200 ${productClicked}`}>
                Cadastro de Produtos
              </button>
              <button onClick={handleCommandForm} className={`w-48 flex justify-start items-center p-2 hover:bg-slate-200 ${commandClicked}`}>
                Cadastro de Mesas
              </button>
              <button onClick={handleReservaForm} className={`w-48 flex justify-start items-center p-2 hover:bg-slate-200 ${reservaClicked}`}>
                Cadastro de Reservas
              </button>
            </div>

            <div className="w-1/2 h-full p-2 rounded border-[1px] border-slate-200">
              {isCategoryForm &&
                <RegCategory />
              }

              {isProductForm &&
                <RegProduct />
              }

              {isCommandForm &&
                <RegCommand />
              }

              {isReservaForm &&
                <RegReserva />
              }
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
