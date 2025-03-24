import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Caixa() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/4 p-4">
          <h2 className="font-bold text-2xl w-full text-center">Abertura de caixa</h2>
          <form className="flex flex-col gap-6 w-full justify-center p-2">
            <div className="flex flex-col gap-2 my-2">
              <label htmlFor="operador" className="font-semibold">Operador:</label>
              <Select name="operador">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Informe o Operador" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="josue">Josué</SelectItem>
                  <SelectItem value="maria">Maria</SelectItem>
                  <SelectItem value="joao batista">João Batista</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2 my-2">
              <label htmlFor="saldoini" className="font-semibold">Saldo Inicial:</label>
              <Input id="saldoini" name="saldoini" type="text" />
            </div>

            <Button>
              Abrir Caixa
            </Button>
          </form>
        </div>

        <div className="flex flex-1 justify-start items-start p-4">
          
        </div>
      </div>

    </div>
  )
}