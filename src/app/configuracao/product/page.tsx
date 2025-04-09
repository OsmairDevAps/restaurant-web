import { useForm, Controller } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react";
import { ICategory, IProduct } from "@/utils/interface";
import { useCategory } from "@/hooks/useCategory";
import { useProduct } from "@/hooks/useProduct";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { FaTrashAlt } from "react-icons/fa";


const productSchema = z.object({
  categoryid: z.string(), 
  name: z.string().min(2, 'O nome do produto deve conter pelo menos 2 caracteres.'),
  price: z.string().min(1, 'O valor precisa ser informado'),
  costprice: z.string()
})

type ProductType = z.infer<typeof productSchema>

export default function RegProduct() {
  const { handleSubmit, control, register, reset, formState:{errors} } = useForm<ProductType>({
    resolver: zodResolver(productSchema)
  })
  const categoryDatabase = useCategory()
  const productDatabase = useProduct()
  const [categories, setCategories] = useState<ICategory[]>([])
  const [products, setProducts] = useState<IProduct[]>([])

  async function loadCategories() {
    const response = await categoryDatabase.list()
    if(response) {
      setCategories(response)
    }
  }

  async function loadProducts() {
    const response = await productDatabase.list()
    if(response) {
      setProducts(response)
    }
  }

  async function onSubmit(data: ProductType) {
    console.log(data)
    const response = await productDatabase.create({
      categoryid: Number(data.categoryid),
      name: data.name,
      price: Number(data.price),
      costprice: Number(data.costprice),
    })
    if (response?.insertedRow) {
      alert('Produto cadastrado com sucesso.')
      loadProducts()
      reset()
    } else {
      alert('Não foi possivel cadastrar o produto.')
    }
  }

  useEffect(() => {
    loadCategories()
    loadProducts()
  },[])

  return (
    <div className="flex flex-row gap-2">
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-1/2 gap-2">
        <h2 className="w-full p-2 font-bold border-b-2 border-b-slate-300 bg-slate-200">Cadastro de categorias</h2>
        <div className="flex flex-col gap-2 my-2">
          <label htmlFor="categoryid" className="font-semibold">Categoria:</label>
          <Controller
            name="categoryid"
            control={control}
            rules={{ required: "Selecione uma categoria" }}
            render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map(item => <SelectItem key={item.id} value={String(item.id)}>{item.description}</SelectItem>)}
                </SelectGroup>
              </SelectContent>
            </Select>
            )}
          />
          {errors.categoryid && <span className="text-red-800">{errors.categoryid?.message}</span>}
        </div>
        <div className="flex flex-col gap-2 my-2">
          <label htmlFor="name" className="font-semibold">Nome do produto:</label>
          <Input 
            className="w-[300px]"
            type="text"
            id="name"
            {...register('name')}
          />
          {errors.name && <span className="text-red-800">{errors.name?.message}</span>}
        </div>

        <div className="flex flex-col gap-2 my-2">
          <label htmlFor="costprice" className="font-semibold">Valor custo:</label>
          <Input 
            className="w-[300px]"
            type="text"
            id="costprice"
            {...register('costprice')}
          />
        </div>

        <div className="flex flex-col gap-2 my-2">
          <label htmlFor="price" className="font-semibold">Valor venda:</label>
          <Input 
            className="w-[300px]"
            type="text"
            id="price"
            {...register('price')}
          />
          {errors.price && <span className="text-red-800">{errors.price?.message}</span>}
        </div>

        <div>
          <Button className="w-[300px]">Salvar</Button>
        </div>
      </form>

      <div className="flex flex-col w-1/2">
        <h2 className="w-full p-2 font-bold border-b-2 border-b-slate-300 bg-slate-200">Produtos cadastrados:</h2>
        <ScrollArea className="h-full w-full rounded-md border">
          <div className="p-4">
            {products.map((item) => (
              <div key={item.id} className={`flex flex-row justify-between items-center text-sm py-2 border-b-[1px] border-dotted border-b-slate-200`}>
                <div>
                  {item.name}
                </div>
                <div>
                  <FaTrashAlt size={18} />
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

    </div>
  )
}