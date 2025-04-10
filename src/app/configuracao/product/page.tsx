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
import { FaEdit, FaTrashAlt, FaPlusCircle } from "react-icons/fa";


const productSchema = z.object({
  categoryid: z.string(), 
  name: z.string().min(2, 'O nome do produto deve conter pelo menos 2 caracteres.'),
  costprice: z.string(),
  price: z.string().min(1, 'O valor precisa ser informado'),
})

type ProductType = z.infer<typeof productSchema>

export default function RegProduct() {
  const { handleSubmit, control, register, reset, formState:{errors} } = useForm<ProductType>({
    resolver: zodResolver(productSchema)
  })
  const [isEditting, setIsEditting] = useState(false)
  const [idProduct, setIdProduct] = useState(0)
  const [defaultValues, setDefaultValues] = useState<ProductType>()
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
    if(isEditting) {
      await productDatabase.update({
        id: idProduct,
        categoryid: Number(data.categoryid),
        name: data.name,
        costprice: Number(data.costprice),
        price: Number(data.price)
      })
      alert('Produto atualizado com sucesso')
      setIsEditting(false)
      reset(defaultValues)
      loadProducts()
    } else {
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
  }

  async function handleUpdate(prod: IProduct) {
    setIsEditting(true)
    setIdProduct(prod.id)
    reset({
      categoryid: String(prod.categoryid),
      name: prod.name,
      costprice: String(prod.costprice),
      price: String(prod.price)
    })
  }
  
  async function handleDelete(id: number) {
    if (confirm("Tem certeza que deseja excluir?") == true) {
      await productDatabase.remove(id)
      alert("Produto excluido!")
      loadProducts()
    } 
  }

  function handleReset() {
    setIdProduct(0)
    setDefaultValues({} as ProductType)
    reset({
      categoryid: '',
      name: '',
      costprice: '',
      price: ''
    })
  }

  useEffect(() => {
    loadCategories()
    loadProducts()
  },[])

  return (
    <div className="flex flex-row gap-2">

      <div>      
        <div className="flex flex-row justify-between items-center w-full p-2 border-b-2 border-b-slate-300 bg-slate-200">
          <h2 className="font-bold">Cadastro de Produtos</h2>
          <button onClick={handleReset}><FaPlusCircle size={18} /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-1/2 gap-2">
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
      </div>

      <div className="flex flex-col w-1/2">
        <h2 className="w-full p-2 font-bold border-b-2 border-b-slate-300 bg-slate-200">Produtos cadastrados:</h2>
        <ScrollArea className="h-full w-full rounded-md border">
          <div className="p-4">
            {products.map((item) => (
              <div key={item.id} className={`flex flex-row justify-between items-center text-sm py-2 border-b-[1px] border-dotted border-b-slate-200`}>
                <div>
                  {item.name}
                </div>
                <div className="flex gap-2">
                  <button onClick={()=> handleUpdate(item)}><FaEdit size={18} /></button>
                  <button onClick={()=> handleDelete(item.id)}><FaTrashAlt size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

    </div>
  )
}