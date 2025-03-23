import { Input } from "@/components/ui/input";
import {
  Select, SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Caixa() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <header className="h-16 flex items-center justify-between bg-slate-300 mb-2">
        <div className="h-10 w-16 bg-slate-950"></div>
        <div className="flex flex-row gap-2">
          <div className="h-10 w-10 rounded-full bg-slate-500"></div>
          <div className="flex flex-col">
            <span className="text-[12px]">Usuario</span>
            <span className="text-[12px]">Função do usuario</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/3 h-screen bg-slate-300">
          <h2>Abertura de caixa</h2>
          <form>
            <div className="w-full px-6 my-2">
              <label htmlFor="operador">Operador:</label>
              <Select name="operador">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Informe o Operador" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full px-6 my-2">
              <label htmlFor="saldoini">Saldo Inicial:</label>
              <Input id="saldoini" type="text" />
            </div>
          </form>
        </div>

        <div className="flex flex-1 justify-start items-start">
          <span>Resto da pagina</span>
        </div>
      </div>

    </div>
  )
}