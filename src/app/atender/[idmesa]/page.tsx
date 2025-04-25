'use client'

import { useEffect, useState } from "react"
import Modal from 'react-modal'
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useCategoria } from "@/hooks/useCategoria"
import { useItemPedido } from "@/hooks/useItemPedido"
import { FiTrash2 } from "react-icons/fi"
import { ICategoria, IMesa, IItemPedido, IProduto } from "@/utils/interface"
import Header from "@/components/header"
import Menu from "@/components/menu"
import { useProduto } from "@/hooks/useProduto"
import { useMesa } from "@/hooks/useMesa"
import { usePedido } from "@/hooks/usePedido"
import { ModalStyles } from "@/styles/modal"
import Receber from "./receber"

type TItensPedido = {
  categoria: string;
  produto: string;
  id: number;
  iditem: number;
  idpedido: number;
  quant: number;
  valor: number;
}

export default function DetalheMesa() {
  const params = useParams()
  const router = useRouter()
  const { idmesa } = params
  const categoriaDatabase = useCategoria()
  const produtoDatabase = useProduto()
  const pedidoDatabase = usePedido()
  const itemPedidoDatabase = useItemPedido()
  const mesaDatabase = useMesa()
  const [isRecebimentoOpen, setIsRecebimentoOpen] = useState(false)
  const [categorias, setCategorias] = useState<ICategoria[]>([])
  const [produtos, setProdutos] = useState<IProduto[]>([])
  const [mesa, setMesa] = useState<IMesa>()
  const [totalPedido, setTotalPedido] = useState(0)
  const [itemsPedido, setItemsPedido] = useState<TItensPedido[]>([])
  
  async function LoadCategories() {
    const response = await categoriaDatabase.listar()
    if (response) {
      setCategorias(response)
    }
  }

  async function LoadMesa(id: number) {
    const response = await mesaDatabase.verMesa(id)
    if (response) {
      setMesa(response)
    }
  }

  async function LoadPedido(idmesa: number) { 
    const responsePedido = await pedidoDatabase.verPedidosPorMesa(idmesa)
    if (responsePedido) {
      LoadItemsPedido(responsePedido.id)
    }
  }

  async function LoadProdutos(idCategoria: number) {
    const response = await produtoDatabase.localizaPorCategoria(idCategoria)
    if(response) {
      setProdutos(response)
    }
  }

  async function LoadItemsPedido(idpedido: number) {
    const response = await itemPedidoDatabase.listaitenspedidos(idpedido)
    if (response) {
      setItemsPedido(response)
      const total = response.reduce((acc, item) => acc + item.valor, 0);
      setTotalPedido(total)
    }
  }

  async function SalvaItemPedido(produto: IProduto) {
    // Cria o pedido da mesa escolhida caso não exista
    if (mesa) {
      if (mesa.status === 'disponivel') {
        await mesaDatabase.atualizar({
          id: mesa.id,
          num: mesa.num,
          status: 'ocupada',
          cor: 'orange'
        })
        const idpedido = await pedidoDatabase.criar({ 
          idmesa: Number(idmesa) 
        })
        // cria itens de pedido:
        await itemPedidoDatabase.criar({
          idpedido: Number(idpedido),
          iditem: produto.id,
          quant: 1,
          valor: 1 * produto.valorfinal
        })
        await LoadItemsPedido(Number(idpedido))
      } else {
        // cria itens de pedido:
        const pedidoAtual = await pedidoDatabase.verPedidosPorMesa(mesa.id)
        await itemPedidoDatabase.criar({
          idpedido: pedidoAtual.id,
          iditem: produto.id,
          quant: 1,
          valor: 1 * produto.valorfinal
        })
        await LoadItemsPedido(Number(pedidoAtual.id))
      }
    }
  }

  async function ExcluiItemPedido(item: TItensPedido) {
    const idpedido = item.idpedido
    await itemPedidoDatabase.excluir(item.id)
    LoadItemsPedido(idpedido)
  }

  async function AtualizaItemPedido(tipo: string, item: IItemPedido) {
    var quantAtual=item.quant
    var quantNova = item.quant
    var valorNovo = item.valor
    var valorUnitario = item.valor / item.quant
    if (tipo === '-' && item.quant > 1) {
      quantNova = quantAtual - 1
    }

    if (tipo === '+') {
      quantNova = quantAtual + 1
    }
    valorNovo = quantNova * valorUnitario
    await itemPedidoDatabase.atualizar({
      id: item.id,
      iditem: item.iditem,
      idpedido: item.idpedido,
      quant: quantNova,
      valor: valorNovo
    })
    LoadItemsPedido(item.idpedido)
  }

  function handleBack() {
    router.push('/atender')
  }
  
  useEffect(() => {
    LoadCategories()
    LoadMesa(Number(idmesa))
    LoadPedido(Number(idmesa))
  },[])

  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Menu />
        
        <div className="w-full h-full">
          <h2 className="px-4 font-bold text-xl">MESA {mesa?.num}</h2>
          
          <div className="w-full flex flex-row gap-4 h-full justify-start items-start p-4">
            <div className="flex flex-col justify-between items-start w-1/2 h-full">
              <div className="flex flex-row justify-between w-full h-full mb-2 bg-slate-100">
                <div className="flex flex-col w-1/3 p-4 gap-2">
                  <h2 className="font-semibold">CATEGORIA:</h2>
                  {categorias.map(item =>  
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
                    produtos.map(item => 
                    <button 
                      key={item.id} 
                      onClick={() => SalvaItemPedido(item) }
                      className="bg-indigo-300 w-60 h-10 m-1 cursor-pointer"
                    >
                      {item.nome} ({Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(item.valorfinal)})
                    </button>)
                  }
                </div>
              </div>
              <div className="flex flex-row justify-between items-center w-full mb-4">
                <Button className="w-60" onClick={handleBack}>Voltar</Button>
                <Button className="w-60" onClick={() => setIsRecebimentoOpen(true)}>Realizar Recebimento</Button>
              </div>
            </div>

            <div className="w-1/2 h-full p-4 flex flex-col justify-start items-start bg-slate-100">
              <h2 className="my-2 font-bold text-lg">Pedido da mesa</h2>
              {
                itemsPedido.map(item => (
                  <div key={item.id} className="w-full border-[1px] border-slate-200 bg-slate-200 p-2 my-1">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row justify-between items-center w-full">
                        <span className="flex-1">{item.categoria} - {item.produto}</span>
                        
                        <div className="flex flex-row justify-between items-center gap-4 w-40">
                          <button
                            onClick={() => AtualizaItemPedido('-', item)}
                            className="p-2 bg-red-100 flex justify-center items-center w-10 cursor-pointer"
                          >
                            <span className="font-bold text-lg">-</span>
                          </button>
                          <span>{item.quant}</span>
                          <button
                            onClick={() => AtualizaItemPedido('+', item)}
                            className="p-2 bg-blue-100 flex justify-center items-center w-10 cursor-pointer"
                          >
                            <span className="font-bold text-lg">+</span>
                          </button>
                          <button
                            onClick={() => ExcluiItemPedido(item)}
                            className="p-2 flex justify-center items-center w-10 cursor-pointer"
                          >
                            <FiTrash2 size={20} />
                          </button>
                        </div>
                        
                        <span className="w-32 text-right">{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(item.valor)}</span>
                      </div>
                    </div>
                  </div>
                ))
              }
              <div className="flex flex-row justify-between items-center bg-slate-300 w-full p-2 mt-1">
                <span className="font-bold text-lg">TOTAL</span>
                <span className="font-bold text-lg">
                  {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(totalPedido)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal 
        style={ModalStyles} 
        ariaHideApp={false} 
        isOpen={isRecebimentoOpen}
      >
        <Receber setIsClose={setIsRecebimentoOpen} />
      </Modal>
    </div>
  )
}