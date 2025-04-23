import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { format } from 'date-fns'
import { ptBR } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { IMesa, IReserva } from "@/utils/interface";
import { TailSpin } from "react-loading-icons";
import { useReserva } from "@/hooks/useReserva";
import { useMesa } from "@/hooks/useMesa";

const reservaSchema = z.object({
  datareserva: z.date({ 
    required_error: "Favor informar a data da reserva." 
  }),
  cliente: z.string().min(3, {
    message: 'Favor digitar pelo menos 3 caracteres'
  }),
  numpessoas: z.string().min(1, {
    message: 'É necessário informar ao menos 1 pessoa'
  }),
  nummesa: z.string({ 
    required_error: "Favor informar a mesa." 
  }),
})
type reservaType = z.infer<typeof reservaSchema>

export default function RegReserva() {
  const IconFaEdit = FaEdit as unknown as React.FC<{size?: number; color?: string;}>;
  const IconFaTrashAlt = FaTrashAlt as unknown as React.FC<{size?: number; color?: string;}>;
  const mesaDatabase = useMesa()
  const reservaDatabase = useReserva()
  const defaultValues = {} as reservaType
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isEditting, setIsEditting] = useState<boolean>(false)
  const [mesas, setMesas] = useState<IMesa[]>([])
  const [reserva, setReserva] = useState<IReserva>()
  const [reservas, setReservas] = useState<IReserva[]>([])
  const form = useForm<reservaType>({
    resolver: zodResolver(reservaSchema)
  })

  async function onSubmit(data: reservaType) {
    console.log(data)
    const objMesa = await mesaDatabase.verMesaPorNumero(Number(data.nummesa))
    if (objMesa) {
      await mesaDatabase.atualizar({
        id: objMesa.id,
        num: objMesa.num,
        status: 'reservada',
        cor: 'yellow'
      })
    }
    await reservaDatabase.criar({
      datareserva: data.datareserva,
      cliente: data.cliente,
      nummesa: data.nummesa,
      numpessoas: Number(data.numpessoas)
    })
    alert('Mesa reservada com sucesso!')
  }

  async function listMesas() {
    const response = await mesaDatabase.listar()
    if (response) {
      setMesas(response)
    }
  }

  async function listReservas() {
    setIsLoading(true)
    const response = await reservaDatabase.listar()
    if (response) {
      setReservas(response)
      setIsLoading(false)
    }
  }

  async function handleUpdate(res: IReserva) {
    setIsEditting(true)
    setReserva(res)
    form.reset(defaultValues)
  }
  
  async function handleDelete(id: number) {
    if (confirm("Tem certeza que deseja excluir?") == true) {
      await reservaDatabase.excluir(id)
      alert("Categoria excluida!")
      listReservas()
    }
  }

  useEffect(()=> {
    listMesas()
    listReservas()
  },[])

  return (
    <div className="flex flex-row gap-2">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-1/2 gap-2">
        <FormField
          control={form.control}
          name="datareserva"
          render={({ field }) => (
            <FormItem className="flex flex-col my-2">
              <FormLabel>Data da reserva:</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Clique</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />

        <FormItem className="flex flex-col my-2">
          <FormLabel htmlFor="cliente">Nome do cliente:</FormLabel>
          <Input 
            id="cliente"
            className="w-[300px]"
            type="text"
            {...form.register('cliente')}
          />
          {form.formState.errors.cliente && 
            <span className="text-red-500 text-md italic">{form.formState.errors.cliente.message}</span>
          }
        </FormItem>

        <FormItem className="flex flex-col my-2">
          <FormLabel htmlFor="numpessoas">Número de pessoas:</FormLabel>
          <Input 
            id="numpessoas"
            className="w-[300px]"
            type="text"
            {...form.register('numpessoas')}
          />
          {form.formState.errors.numpessoas && 
            <span className="text-red-500 text-md italic">{form.formState.errors.numpessoas.message}</span>
          }
        </FormItem>

        <FormField 
          control={form.control}
          name="nummesa"
          render={({ field })=>(
            <FormItem className="flex flex-col">
              <FormLabel htmlFor={field.name}>Mesa:</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Informe a mesa" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {mesas.map(item => (
                    <SelectItem key={item.id} value={String(item.num)}>{item.num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.nummesa && 
                <span className="text-red-500 text-md italic">{form.formState.errors.nummesa.message}</span>
              }
            </FormItem>
          )}
        />
        <Button type="submit">Salvar</Button>
      </form>
    </Form>

      <div className="flex flex-col w-full">
        <h2 className="w-full p-2 font-bold border-b-2 border-b-slate-300 bg-slate-200">Reservas cadastradas</h2>
        <ScrollArea className="h-full w-full rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Reservas</h4>
            {isLoading ? <TailSpin stroke="#121212" /> :
              reservas.map((item) => (
                <div key={item.id} className={`flex flex-row justify-between items-center text-sm py-2 border-b-[1px] border-dotted border-b-slate-200`}>
                  <div>{item.cliente}</div>
                  <div>Mesa {item.nummesa}</div>
                  <div>
                    {
                    Intl.DateTimeFormat('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    }).format(new Date(item.datareserva))
                    }
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