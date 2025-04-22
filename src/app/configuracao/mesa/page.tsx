import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMesa } from "@/hooks/useMesa"
import { IMesa } from "@/utils/interface"
import { zodResolver } from "@hookform/resolvers/zod"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { FaEdit, FaTrashAlt } from "react-icons/fa"
import { TailSpin } from "react-loading-icons"
import { z } from "zod"

const mesaSchema = z.object({
  amount: z.string().min(1, 'É necessário informar a quantidade total de mesas.'),
})

type mesaType = z.infer<typeof mesaSchema>

export default function RegMesa() {
  const IconFaEdit = FaEdit as unknown as React.FC<{ size?: number; color?: string;}>;
  const IconFaTrashAlt = FaTrashAlt as unknown as React.FC<{ size?: number; color?: string;}>;
  const [isLoading, setIsLoading] = useState(false)
  const [mesas, setMesas] = useState<IMesa[]>([])
  const mesaDatabase = useMesa()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<mesaType>({
    resolver: zodResolver(mesaSchema)
  })

  async function loadMesas() {
    setIsLoading(true)
    const response = await mesaDatabase.listar()
    if (response) {
      setMesas(response)
      setIsLoading(false)
    }
  }

  async function onSubmit(data: mesaType) {
    // exclui mesas pre-existentes
    const response = await mesaDatabase.listar()
    if (response) {
      response.map((item: IMesa) => mesaDatabase.excluir(item.id))
    }

    // cria novas mesas
    for (let index = 0; index < Number(data.amount); index++) {
      await mesaDatabase.criar({
        num: index + 1,
        status: 'disponivel',
        cor: 'blue'
      })
    }
    alert('Mesas cadastradas!')
    loadMesas()
  }

  async function handleUpdate(com: IMesa) { }

  async function handleDelete(id: number) {
    if (confirm("Tem certeza que deseja excluir esta mesa?") == true) {
      await mesaDatabase.excluir(id)
      alert('Mesa excluida com sucesso!')
      loadMesas()
    }
  }

  useEffect(() => {
    loadMesas()
  }, [])

  return (
    <div className="flex flex-row gap-2">
      <div className="flex flex-col w-1/2">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-1/2 gap-2">
          <div className="flex flex-col gap-2 my-2">
            <label htmlFor="description">Quantidade de mesas:</label>
            <Input
              className="w-[300px]"
              type="text"
              id="amount"
              {...register('amount')}
            />
            {errors.amount && <span className="text-red-800">{errors.amount?.message}</span>}
          </div>
          <Button className="w-[300px]">Salvar</Button>
        </form>
      </div>

      <div className="flex flex-col w-1/2">
        <h2 className="w-full p-2 font-bold border-b-2 border-b-slate-300 bg-slate-200">Mesas cadastradas</h2>
        <ScrollArea className="h-full w-full rounded-md border">
          <div className="p-2">
            {isLoading ? <TailSpin stroke="#121212" /> :
              mesas.map((item) => (
                <div key={item.id} 
                  className={`flex flex-row justify-between items-center text-sm p-2 border-b-[1px] border-dotted border-b-slate-200 bg-${item.cor}-200`}>
                  <div>Mesa {item.num}</div>
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