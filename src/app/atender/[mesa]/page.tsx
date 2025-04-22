'use client'

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useCategoria } from "@/hooks/useCategoria"
import { useItemPedido } from "@/hooks/useItemPedido"
import { ICategoria, IMesa, IItemPedido, IProduto } from "@/utils/interface"
import Header from "@/components/header"
import Menu from "@/components/menu"
import { useProduto } from "@/hooks/useProduto"
import { useMesa } from "@/hooks/useMesa"

export default function DetalheMesa() {
  const [categoryName, setCategoryName] = useState('')
  const [categories, setCategories] = useState<ICategoria[]>([])
  const [products, setProducts] = useState<IProduto[]>([])
  const [command, setCommand] = useState<IMesa>()
  const [itemsCommand, setItemsCommand] = useState<IItemPedido[]>([])
  const categoryDatabase = useCategoria()
  const productDatabase = useProduto()
  const mesaDatabase = useMesa()
  const itemCommandDatabase = useItemPedido()
  const params = useParams()
  const router = useRouter()
  const { mesa } = params

  async function LoadCategories() {
    const response = await categoryDatabase.listar()
    if (response) {
      setCategories(response)
    }
  }

  async function LoadProdutos(idCategoria: number) {
    const cat = await categoryDatabase.verCategoria(idCategoria)
    if (cat) {
      setCategoryName(cat)
    }
    const response = await productDatabase.localizaPorCategoria(idCategoria)
    if(response) {
      setProducts(response)
    }
  }

  async function SaveItemPedido(product: IProduto) {
    // verificar
  }

  async function loadItemsPedido(idcommand: number) {
    const response = await itemCommandDatabase.localizar(idcommand)
    if (response) {
      setItemsCommand(response)
    }
  }

  function handleBack() {
    router.push('/atender')
  }

  async function loadMesa(id: number) {
    const response = await mesaDatabase.verMesa(id)
    if (response) {
      setCommand(response)
    }
  }
  
  useEffect(() => {
    loadMesa(Number(mesa))
    LoadCategories()
    // loadItemsCommand(Number(mesa))
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
                      onClick={() => LoadProdutos(item.id) }
                      className="bg-purple-300 w-48 h-10 cursor-pointer"
                    >
                      {item.descricao}
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
                      onClick={() => SaveItemPedido(item) }
                      className="bg-indigo-300 w-60 h-10 m-1 cursor-pointer"
                    >
                      {item.nome}
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
                //itemsCommand.map(item => (
                  <div className="w-full border-[1px] border-slate-300 bg-slate-300 p-2 my-1">
                    <h2 className="font-bold">{/*item.categoria*/}</h2>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row justify-between items-center w-full">
                        <span>{/*item.product*/}</span>
                        <div className="flex flex-row justify-center items-center gap-4">
                          <button
                            className="p-2 bg-red-100 flex justify-center items-center w-10 cursor-pointer"
                          >
                            <span className="font-bold text-lg">-</span>
                          </button>
                          <span>{/*item.amount*/}</span>
                            <button
                              className="p-2 bg-blue-100 flex justify-center items-center w-10 cursor-pointer"
                            >
                            <span className="font-bold text-lg">+</span>
                          </button>
                        </div>
                        <span>{/*item.price*/}</span>
                      </div>
                      <div className="flex flex-row justify-between items-center w-full">
                        <span className="font-semibold">Sub-total:</span>
                        <span>R$ 0,00</span>
                      </div>
                    </div>
                  </div>
                //))
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