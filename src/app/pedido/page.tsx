import Header from "@/components/header";
import Menu from "@/components/menu";

export default function Pedido() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Menu />

        <div className="flex flex-row w-full">
          <div className="flex flex-col w-2/6 border-[1px] border-gray-300">
            <div className="flex flex-row justify-between items-center w-full border-b-[1px] border-gray-300 p-4">
              <div className="flex flex-col">
                <span className="font-semibold">#1212</span>
                <span className="font-semibold">16:44</span>
              </div>

              <div className="flex flex-col">
                <span className="font-semibold">José Antônio</span>
                <span className="text-sm">Previsão: 19:05</span>
              </div>

              <div className="flex flex-col">
                <span className="bg-yellow-600 px-4 py-1 rounded text-white text-md font-semibold">Em preparo</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-4/5 p-4">
            detalhes do pedido selecionado
          </div>
        </div>
      </div>
    </div>
  )
}