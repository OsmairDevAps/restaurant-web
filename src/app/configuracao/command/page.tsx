import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCommand } from "@/hooks/useCommand"
import { ICommand } from "@/utils/interface"
import { zodResolver } from "@hookform/resolvers/zod"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { FaEdit, FaTrashAlt } from "react-icons/fa"
import { z } from "zod"

const commandSchema = z.object({
  amount: z.string().min(1, 'É necessário informar a quantidade total de mesas.'),
})

type commandType = z.infer<typeof commandSchema>

export default function RegCommand() {
  const [commands, setCommands] = useState<ICommand[]>([])
  const commandDatabase = useCommand()
  const { 
    handleSubmit, 
    register, 
    reset, 
    formState: {errors} 
    } = useForm<commandType>({
      resolver: zodResolver(commandSchema)
  })

  async function loadCommands() {
    const response = await commandDatabase.list()
    if (response) {
      setCommands(response)
    }
  }

  async function onSubmit(data: commandType) {
    // exclui mesas pre-existentes
    const response = await commandDatabase.list()
    if (response) {
      response.map((item: ICommand) => commandDatabase.remove(item.id) )
    }

    // cria novas mesas
    for (let index = 0; index < Number(data.amount); index++) {
      await commandDatabase.create({
        num: index+1,
        status: 'disponivel',
        color: 'blue'
      })
    }
    alert('Mesas cadastradas!')
    loadCommands()
  }

  async function handleUpdate(com: ICommand) {}

  async function handleDelete(id: number) {
    if (confirm("Tem certeza que deseja excluir esta mesa?") == true) {
      await commandDatabase.remove(id)
      alert('Mesa excluida com sucesso!')
      loadCommands()
    }
  }

  useEffect(() => {
    loadCommands()
  },[])

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
          <div className="p-0">
            {commands.map((item) => (
              <div key={item.id} className={`flex flex-row justify-between items-center text-sm p-2 border-b-[1px] border-dotted border-b-slate-200 bg-${item.color}-200`}>
                <div>Mesa {item.num}</div>
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