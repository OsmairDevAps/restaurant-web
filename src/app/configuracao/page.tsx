import Header from "@/components/header";
import Menu from "@/components/menu";

export default function Configuracao() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Menu />
        <div>
          <h2>Configurações</h2>
        </div>
      </div>
    </div>
  )
}
