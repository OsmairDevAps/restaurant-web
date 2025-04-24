import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TailSpin } from 'react-loading-icons'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ICategoria, IProduto } from "@/utils/interface";
import { useCategoria } from "@/hooks/useCategoria";
import { useProduto } from "@/hooks/useProduto";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { FaEdit, FaTrashAlt, FaPlusCircle } from "react-icons/fa";

const productSchema = z.object({
  idcategoria: z.string(),
  nome: z.string().min(2, 'O nome do produto deve conter pelo menos 2 caracteres.'),
  valorcusto: z.string(),
  valorfinal: z.string().min(1, 'O valor precisa ser informado'),
})
type TProduto = {
  categoria: string;
  id: number;
  idcategoria: number;
  nome: string;
  valorcusto: number;
  valorfinal: number;
}
type ProductType = z.infer<typeof productSchema>

export default function RegProduct() {
  const { handleSubmit, control, register, reset, formState: { errors } } = useForm<ProductType>({
    resolver: zodResolver(productSchema)
  })
  const IconFaPlusCircle = FaPlusCircle as unknown as React.FC<{ size?: number; color?: string;}>;
  const IconFaEdit = FaEdit as unknown as React.FC<{size?: number; color?: string;}>;
  const IconFaTrashAlt = FaTrashAlt as unknown as React.FC<{size?: number; color?: string;}>;
  const [isProdLoading, setIsProdLoading] = useState(false)
  const [isEditting, setIsEditting] = useState(false)
  const [idProduct, setIdProduct] = useState(0)
  const [defaultValues, setDefaultValues] = useState<ProductType>()
  const categoriaDatabase = useCategoria()
  const produtoDatabase = useProduto()
  const [categorias, setCategorias] = useState<ICategoria[]>([])
  const [produtos, setProdutos] = useState<TProduto[]>([])

  async function loadCategorias() {
    const response = await categoriaDatabase.listar()
    if (response) {
      setCategorias(response)
    }
  }

  async function loadProdutos() {
    setIsProdLoading(true)
    const response = await produtoDatabase.list()
    if (response) {
      setProdutos(response)
      setIsProdLoading(false)
    }
  }

  async function onSubmit(data: ProductType) {
    if (isEditting) {
      await produtoDatabase.atualizar({
        id: idProduct,
        idcategoria: Number(data.idcategoria),
        nome: data.nome,
        valorcusto: Number(data.valorcusto),
        valorfinal: Number(data.valorfinal)
      })
      alert('Produto atualizado com sucesso')
      setIsEditting(false)
      reset(defaultValues)
      loadProdutos()
    } else {
      const response = await produtoDatabase.criar({
        idcategoria: Number(data.idcategoria),
        nome: data.nome,
        valorcusto: Number(data.valorcusto),
        valorfinal: Number(data.valorfinal),
      })
      reset(defaultValues)
      if (response) {
        alert('Produto cadastrado com sucesso.')
        loadProdutos()
        reset()
      } else {
        alert('Não foi possivel cadastrar o produto.')
      }
    }
  }

  async function handleUpdate(prod: IProduto) {
    setIsEditting(true)
    setIdProduct(prod.id)
    reset({
      idcategoria: String(prod.idcategoria),
      nome: prod.nome,
      valorcusto: String(prod.valorcusto),
      valorfinal: String(prod.valorfinal)
    })
  }

  async function handleDelete(id: number) {
    if (confirm("Tem certeza que deseja excluir?") == true) {
      await produtoDatabase.excluir(id)
      alert("Produto excluido!")
      loadProdutos()
    }
  }

  function handleReset() {
    setIdProduct(0)
    setDefaultValues({} as ProductType)
    reset({
      idcategoria: '',
      nome: '',
      valorcusto: '',
      valorfinal: ''
    })
  }

  useEffect(() => {
    loadCategorias()
    loadProdutos()
  }, [])

  return (
    <div className="flex flex-row gap-2">

      <div>
        <div className="flex flex-row justify-between items-center w-full p-2 border-b-2 border-b-slate-300 bg-slate-200">
          <h2 className="font-bold">Cadastro de Produtos</h2>
          <button onClick={handleReset}><IconFaPlusCircle size={18} /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-1/2 gap-2">
          <div className="flex flex-col gap-2 my-2">
            <label htmlFor="categoryid" className="font-semibold">Categoria:</label>
            <Controller
              name="idcategoria"
              control={control}
              rules={{ required: "Selecione uma categoria" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categorias.map(item => <SelectItem key={item.id} value={String(item.id)}>{item.descricao}</SelectItem>)}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.idcategoria && <span className="text-red-800">{errors.idcategoria?.message}</span>}
          </div>
          <div className="flex flex-col gap-2 my-2">
            <label htmlFor="name" className="font-semibold">Nome do produto:</label>
            <Input
              className="w-[300px]"
              type="text"
              id="nome"
              {...register('nome')}
            />
            {errors.nome && <span className="text-red-800">{errors.nome?.message}</span>}
          </div>

          <div className="flex flex-col gap-2 my-2">
            <label htmlFor="valorcusto" className="font-semibold">Valor custo:</label>
            <Input
              className="w-[300px]"
              type="text"
              id="valorcusto"
              {...register('valorcusto')}
            />
          </div>

          <div className="flex flex-col gap-2 my-2">
            <label htmlFor="valorfinal" className="font-semibold">Valor venda:</label>
            <Input
              className="w-[300px]"
              type="text"
              id="valorfinal"
              {...register('valorfinal')}
            />
            {errors.valorfinal && <span className="text-red-800">{errors.valorfinal?.message}</span>}
          </div>

          <div>
            <Button className="w-[300px]">Salvar</Button>
          </div>
        </form>
      </div>

      <div className="flex flex-col w-full">
        <h2 className="w-full p-2 font-bold border-b-2 border-b-slate-300 bg-slate-200">Produtos cadastrados:</h2>
        <ScrollArea className="h-full w-full rounded-md border">
          <div className="p-4">
            {isProdLoading ? <TailSpin stroke="#121212" /> :
              produtos.map((item) => (
                <div key={item.id} className={`flex flex-row justify-between items-center text-sm py-2 border-b-[1px] border-dotted border-b-slate-200`}>
                  <div className="w-40">{item.categoria}</div>
                  <div className="flex-1">{item.nome}</div>
                  <div className="flex gap-2">
                    <button onClick={() => handleUpdate(item)}><IconFaEdit size={18} /></button>
                    <button onClick={() => handleDelete(item.id)}><IconFaTrashAlt size={18} /></button>
                  </div>
                </div>
              ))}
          </div>
        </ScrollArea>
      </div>

    </div>
  )
}