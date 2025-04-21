import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { useCategory } from "@/hooks/useCategory";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area"
import { ICategory } from "@/utils/interface";
import { TailSpin } from "react-loading-icons";

const categorySchema = z.object({
  description: z.string().min(2, 'A categoria precisa ter no minimo 2 caracteres!')
})
type categoryType = z.infer<typeof categorySchema>

export default function RegCategory() {
  const categoryDatabase = useCategory()
  const defaultValues = {} as ICategory
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isEditting, setIsEditting] = useState<boolean>(false)
  const [category, setCategory] = useState<ICategory>()
  const [categories, setCategories] = useState<ICategory[]>([])
  const { handleSubmit, register, reset, formState: { errors } } = useForm<categoryType>({
    resolver: zodResolver(categorySchema)
  })

  async function listCategories() {
    setIsLoading(true)
    const response = await categoryDatabase.list()
    setCategories(response)
    setIsLoading(false)
  }

  async function handleUpdate(cat: ICategory) {
    setIsEditting(true)
    setCategory(cat)
    reset(cat)
  }

  async function handleDelete(id: number) {
    if (confirm("Tem certeza que deseja excluir?") == true) {
      await categoryDatabase.remove(id)
      alert("Categoria excluida!")
      listCategories()
    }
  }

  async function onSubmit(data: categoryType) {
    if (isEditting) {
      await categoryDatabase.update({
        id: Number(category?.id),
        description: data.description
      })
      alert('Categoria atualizada com sucesso')
      setIsEditting(false)
      reset(defaultValues)
      listCategories()
    } else {
      const response = await categoryDatabase.create(data)
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
            id="description"
            {...register('description')}
          />
          {errors && <span className="text-red-800">{errors.description?.message}</span>}
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
                    {item.description}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleUpdate(item)}><FaEdit size={18} /></button>
                    <button onClick={() => handleDelete(item.id)}><FaTrashAlt size={18} /></button>
                  </div>
                </div>
              ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}