import { Input } from "@/components/ui/input";
import { FiX } from "react-icons/fi";

interface Props {
  setIsClose: (isOpen:boolean) => void;
}

export default function Receber({setIsClose}:Props) {

  function Close() {
    setIsClose(false)
  }
  
  return (
    <div className="w-[600px] h-[500px]">
      <div className="flex flex-row justify-between items-center w-full h-10 p-2 bg-slate-200">
        <h2 className="font-semibold">Recebimento de comanda:</h2>
        <button onClick={Close} className="p-1 border-[1px] border-red-700 rounded hover:bg-red-200 hover:cursor-pointer">
          <FiX size={20} className="text-red-700" />
        </button>
      </div>

      <div>
        <form className="flex flex-col gap-2">
          <div className="my-1 flex flex-col gap-1">
            <label className="font-semibold">Cliente (opcional):</label>
            <Input />
          </div>
          <div className="my-1 flex flex-col gap-1">
            <label className="font-semibold">CPF do Cliente (opcional):</label>
            <Input />
          </div>
          <div className="flex flex-row justify-start gap-8 items-center">
            <div className="my-1 flex flex-col gap-1">
              <label className="font-semibold">Acréscimo:</label>
              <Input />
            </div>
            <div className="my-1 flex flex-col gap-1">
              <label className="font-semibold">Desconto:</label>
              <Input />
            </div>
          </div>
          <div className="my-1 flex flex-col gap-1">
            <label className="font-semibold">Forma de pagamento:</label>
            <Input />
          </div>
          <div className="my-1 flex flex-col gap-1">
            <label className="font-semibold">Observação:</label>
            <Input />
          </div>
          <div className="my-1 flex flex-col gap-1">
            <button>Confirmar Recebimento</button>
          </div>
        </form>
      </div>
    </div>
  )
}