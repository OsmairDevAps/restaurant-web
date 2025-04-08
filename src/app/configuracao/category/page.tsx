import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { useCategory } from "@/hooks/useCategory";
import { useEffect, useState } from "react";
import { ICategory } from "@/utils/interface";

const categorySchema = z.object({
  description: z.string().min(2, 'A categoria precisa ter no minimo 2 caracteres!')
})
type categoryType = z.infer<typeof categorySchema>

export default function RegCategory() {
  const categoryDatabase = useCategory()
  const [categories, setCategories] = useState<ICategory[]>([])
  const { handleSubmit, register, reset, formState:{errors} } = useForm<categoryType>({
    resolver: zodResolver(categorySchema)
  })

  async function listCategories() {
    const response = await categoryDatabase.list()
    setCategories(response)
  }

  async function onSubmit(data: categoryType) {
    const response = await categoryDatabase.create(data)
    if (response?.insertedRow) {
      alert('Categoria criada com sucesso')
      reset()
    } else {
      alert('Não foi possivel criar a categoria.')
    }
  }

  useEffect(() => {
    listCategories()
    console.log(categories)
  }, [])

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="w-full p-2  font-bold border-b-2 border-b-slate-300 bg-slate-200">Cadastro de categorias</h2>
        <div className="flex flex-col gap-2 my-2">
          <label htmlFor="description">Nome da categoria:</label>
          <Input 
            type="text"
            id="description"
            {...register('description')}
          />
          {errors && <span className="text-red-800">{errors.description?.message}</span>}
        </div>
          <Button className="w-full">Salvar</Button>
      </form>

      <div className="flex flex-col justify-start items-start my-4">
        <h2 className="p-2 w-full bg-slate-200">Categorias cadastradas:</h2>
        {categories.map(item => 
          <span key={item.id} className="p-2">
            {item.description}
          </span>
        )}
      </div>
    </div>
  )
}