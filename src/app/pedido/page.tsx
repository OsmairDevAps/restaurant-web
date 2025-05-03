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
                <span className="bg-yellow-600 px-4 py-1 rounded text-white text-md font-semibold">
                  Em preparo
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-4/5">
            <div className="flex flex-row justify-between items-center w-full p-4">
              <div className="flex flex-col justify-start items-start">
                <span className="text-xl font-semibold">#1212</span>
                <span className="text-xl font-semibold">18:45</span>
                <span className="text-2xl font-bold">MESA 01</span>
              </div>
              <div className="flex flex-col justify-start items-start">
                <span className="text-xl font-semibold">José Antônio</span>
              </div>
              <div className="flex flex-col justify-center items-center">
                <span className="bg-yellow-600 px-4 py-1 rounded text-white text-md font-semibold">
                  Em preparo
                </span>
                <span className="text-sm">Previsão: 19:05</span>
              </div>
            </div>

            <div className="flex flex-col justify-start items-start w-full mt-4 p-4 border-t-[1px] border-b-[1px] border-gray-300">
              <div className="flex flex-row justify-between items-center w-full">
                <span className="w-48">Categoria 01</span>
                <span className="flex-1">Produto 01</span>
                <span className="w-12">1</span>
                <span className="w-20 text-right">R$ 9,99</span>
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                <span className="w-48">Categoria 01</span>
                <span className="flex-1">Produto 02</span>
                <span className="w-12">2</span>
                <span className="w-20 text-right">R$ 9,99</span>
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                <span className="flex flex-row flex-1 justify-end items-center pr-2 font-semibold">Total:</span>
                <span className="w-20 text-right font-semibold">R$ 99,99</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 p-4">
              <h2 className="flex flex-row justify-center items-center text-2xl font-semibold">Pagamento</h2>
              <div className="flex flex-row w-full">
                <div className="flex flex-col justify-start items-start gap-2 w-2/3">
                  <div className="flex flex-row w-80 gap-2">
                    <label>Tipo:</label>
                    <input type="text" placeholder="Cartão de Débito" />
                  </div>
                  <div className="flex flex-row gap-2">
                    <label>Parcelamento:</label>
                    <input type="text" placeholder="1x" />
                  </div>
                  <div className="flex flex-row w-80 gap-2">
                    <label>Valor:</label>
                    <input type="text" placeholder="0,00" />
                  </div>
                  <div className="flex flex-row w-80 gap-2">
                    <label>(-)Desconto:</label>
                    <input type="text" placeholder="0,00" />
                  </div>
                  <div className="flex flex-row w-80 gap-2">
                    <label>(+)Acréscimo:</label>
                    <input type="text" placeholder="0,00" />
                  </div>
                </div>

                <div className="flex flex-col justify-start items-end gap-2 w-1/3">
                  <div className="flex flex-col justify-start items-start gap-2">
                    <div className="flex flex-row justify-start items-center">
                      <span className="font-semibold w-36">Valor do Pedido:</span>
                      <span className="font-semibold w-16 text-right">R$ 99,99</span>
                    </div>
                    <div className="flex flex-row justify-start items-center">
                      <span className="font-semibold w-36">Valor da Gorjeta:</span>
                      <span className="font-semibold w-16 text-right">R$ 99,99</span>
                    </div>
                    <div className="flex flex-row justify-start items-center">
                      <span className="font-semibold w-36">Valor Pago:</span>
                      <span className="font-semibold w-16 text-right">R$ 99,99</span>
                    </div>
                    <div className="flex flex-row justify-start items-center">
                      <span className="font-semibold w-36">Valor a Pagar:</span>
                      <span className="font-semibold w-16 text-right">R$ 99,99</span>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-60 h12 px-4 py-1 bg-blue-500 text-white font-semibold">
                Efetuar Pagamento
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}