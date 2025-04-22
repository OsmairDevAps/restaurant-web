import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { useCategoria } from "@/hooks/useCategoria";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area"
import { ICategoria } from "@/utils/interface";
import { TailSpin } from "react-loading-icons";

const categorySchema = z.object({
  descricao: z.string().min(2, 'A categoria precisa ter no minimo 2 caracteres!')
})
type categoryType = z.infer<typeof categorySchema>

export default function RegCategory() {
  const IconFaEdit = FaEdit as unknown as React.FC<{size?: number; color?: string;}>;
  const IconFaTrashAlt = FaTrashAlt as unknown as React.FC<{size?: number; color?: string;}>;
  const categoriaDatabase = useCategoria()
  const defaultValues = {} as ICategoria
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isEditting, setIsEditting] = useState<boolean>(false)
  const [categoria, setCategoria] = useState<ICategoria>()
  const [categories, setCategories] = useState<ICategoria[]>([])
  const { handleSubmit, register, reset, formState: { errors } } = useForm<categoryType>({
    resolver: zodResolver(categorySchema)
  })

  async function listCategories() {
    setIsLoading(true)
    const response = await categoriaDatabase.listar()
    setCategories(response)
    setIsLoading(false)
  }

  async function handleUpdate(cat: ICategoria) {
    setIsEditting(true)
    setCategoria(cat)
    reset(cat)
  }

  async function handleDelete(id: number) {
    if (confirm("Tem certeza que deseja excluir?") == true) {
      await categoriaDatabase.excluir(id)
      alert("Categoria excluida!")
      listCategories()
    }
  }

  async function onSubmit(data: categoryType) {
    if (isEditting) {
      await categoriaDatabase.atualizar({
        id: Number(categoria?.id),
        descricao: data.descricao
      })
      alert('Categoria atualizada com sucesso')
      setIsEditting(false)
      reset(defaultValues)
      listCategories()
    } else {
      const response = await categoriaDatabase.criar(data)
      if (response?.insertedRow) {
        alert('Categoria criada com sucesso')
        reset(defaultValues)
        listCategories()
      } else {
        alert('Não foi possivel criar a categoria.')
      }
    }
  }

  useEffect(() => {
    listCategories()
  }, [])

  return (
    <div className="flex flex-row gap-2">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-1/2 gap-2">
        <h2 className="w-full p-2 font-bold border-b-2 border-b-slate-300 bg-slate-200">Cadastro de categorias</h2>
        <div className="flex flex-col gap-2 my-2">
          <label htmlFor="description">Nome da categoria:</label>
          <Input
            className="w-[300px]"
            type="text"
            id="descricao"
            {...register('descricao')}
          />
          {errors && <span className="text-red-800">{errors.descricao?.message}</span>}
        </div>
        <Button className="w-[300px]">Salvar</Button>
      </form>

      <div className="flex flex-col w-1/2">
        <h2 className="w-full p-2 font-bold border-b-2 border-b-slate-300 bg-slate-200">Categorias cadastradas</h2>
        <ScrollArea className="h-full w-full rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Categorias</h4>
            {isLoading ? <TailSpin stroke="#121212" /> :
              categories.map((item) => (
                <div key={item.id} className={`flex flex-row justify-between items-center text-sm py-2 border-b-[1px] border-dotted border-b-slate-200`}>
                  <div>
                    {item.descricao}
                  </div>
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