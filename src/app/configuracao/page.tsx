'use client'

import Header from "@/components/header";
import Menu from "@/components/menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import RegCategory from "./category/page";
import RegProduct from "./product/page";
import RegCommand from "./command/page";

export default function Configuracao() {
  const [categoryClicked, setCategoryClicked] = useState('')
  const [productClicked, setProductClicked] = useState('')
  const [commandClicked, setCommandClicked] = useState('')
  const [isCategoryForm, setIsCategoryForm] = useState(false)
  const [isProductForm, setIsProductForm] = useState(false)
  const [isCommandForm, setIsCommandForm] = useState(false)

  function handleCategoryForm() {
    setIsCategoryForm(true)
    setIsProductForm(false)
    setIsCommandForm(false)
    setCategoryClicked('bg-slate-200')
    setProductClicked('')
    setCommandClicked('')
  }
  
  function handleProductForm() {
    setIsCategoryForm(false)
    setIsProductForm(true)
    setIsCommandForm(false)
    setCategoryClicked('')
    setProductClicked('bg-slate-200')
    setCommandClicked('')
  }
  
  function handleCommandForm() {
    setIsCategoryForm(false)
    setIsProductForm(false)
    setIsCommandForm(true)
    setCategoryClicked('')
    setProductClicked('')
    setCommandClicked('bg-slate-200')
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
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
