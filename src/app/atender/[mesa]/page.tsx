'use client'

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useCategory } from "@/hooks/useCategory"
import { useItemCommand } from "@/hooks/useItemCommand"
import { ICategory, ICommand, ICommandItem, IProduct } from "@/utils/interface"
import Header from "@/components/header"
import Menu from "@/components/menu"
import { useProduct } from "@/hooks/useProduct"
import { useCommand } from "@/hooks/useCommand"

export default function DetalheMesa() {
  const [categoryName, setCategoryName] = useState('')
  const [categories, setCategories] = useState<ICategory[]>([])
  const [products, setProducts] = useState<IProduct[]>([])
  const [command, setCommand] = useState<ICommand>()
  const [itemsCommand, setItemsCommand] = useState<ICommandItem[]>([])
  const categoryDatabase = useCategory()
  const productDatabase = useProduct()
  const mesaDatabase = useCommand()
  const itemCommandDatabase = useItemCommand()
  const params = useParams()
  const router = useRouter()
  const { mesa } = params

  async function LoadCategories() {
    const response = await categoryDatabase.list()
    if (response) {
      setCategories(response)
    }
  }

  async function LoadProducts(idCategory: number) {
    const cat = await categoryDatabase.findOnce(idCategory)
    if (cat) {
      setCategoryName(cat)
    }
    const response = await productDatabase.findByCategory(idCategory)
    if(response) {
      setProducts(response)
    }
  }

  async function SaveItemCommand(product: IProduct) {
    await itemCommandDatabase.create({
      idcommand: Number(mesa),
      client: '',
      clientdoc: '',
      category: categoryName,
      product: product.name,
      amount: 1,
      price: product.price,
      obs: ''
  })
    loadItemsCommand(Number(mesa))
  }

  async function loadItemsCommand(idcommand: number) {
    const response = await itemCommandDatabase.search(idcommand)
    if (response) {
      setItemsCommand(response)
    }
  }

  function handleBack() {
    router.push('/atender')
  }

  async function loadMesa(id: number) {
    const response = await mesaDatabase.findOnce(id)
    if (response) {
      setCommand(response)
    }
  }
  
  useEffect(() => {
    loadMesa(Number(mesa))
    LoadCategories()
    loadItemsCommand(Number(mesa))
  },[])

  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Menu />
        
        <div className="w-full h-full">
          <h2 className="px-4 font-bold text-xl">MESA {command?.num}</h2>
          
          <div className="w-full flex flex-row gap-4 h-full justify-start items-start p-4">
            <div className="flex flex-col justify-between items-start w-1/2 h-full">
              <div className="flex flex-row justify-between w-full h-full mb-2 bg-slate-100">
                <div className="flex flex-col w-1/3 p-4 gap-2">
                  <h2 className="font-semibold">CATEGORIA:</h2>
                  {categories.map(item =>  
                    <button key={item.id} 
                      onClick={() => LoadProducts(item.id) }
                      className="bg-purple-300 w-48 h-10 cursor-pointer"
                    >
                      {item.description}
                    </button>)
                  }
                </div>
                {/* Produtos da categoria selecionada */}
                <div className="flex-wrap w-2/3 p-4 gap-2">
                  <h2 className="font-semibold">PRODUTOS:</h2>
                  {
                    products.map(item => 
                    <button 
                      key={item.id} 
                      onClick={() => SaveItemCommand(item) }
                      className="bg-indigo-300 w-60 h-10 m-1 cursor-pointer"
                    >
                      {item.name}
                    </button>)
                  }
                </div>
              </div>
              <div className="flex flex-row justify-between items-center w-full mb-4">
                <Button className="w-60" onClick={handleBack}>Voltar</Button>
                <Button className="w-60">Finalizar Atendimento</Button>
              </div>
            </div>

            <div className="w-1/2 h-full p-4 flex flex-col justify-start items-start bg-slate-100">
              <h2 className="my-2 font-bold text-lg">Pedido da mesa</h2>
              
              {
                itemsCommand.map(item => (
                  <div key={item.id} className="w-full border-[1px] border-slate-300 bg-slate-300 p-2 my-1">
                    <h2 className="font-bold">{item.category}</h2>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row justify-between items-center w-full">
                        <span>{item.product}</span>
                        <div className="flex flex-row justify-center items-center gap-4">
                          <button
                            className="p-2 bg-red-100 flex justify-center items-center w-10 cursor-pointer"
                          >
                            <span className="font-bold text-lg">-</span>
                          </button>
                          <span>{item.amount}</span>
                            <button
                              className="p-2 bg-blue-100 flex justify-center items-center w-10 cursor-pointer"
                            >
                            <span className="font-bold text-lg">+</span>
                          </button>
                        </div>
                        <span>{item.price}</span>
                      </div>
                      <div className="flex flex-row justify-between items-center w-full">
                        <span className="font-semibold">Sub-total:</span>
                        <span>R$ 0,00</span>
                      </div>
                    </div>
                  </div>
                ))
              }

              <div className="flex flex-row justify-between items-center bg-slate-300 w-full p-2 mt-1">
                <span className="font-bold text-lg">TOTAL</span>
                <span className="font-bold text-lg">R$ 0,00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}