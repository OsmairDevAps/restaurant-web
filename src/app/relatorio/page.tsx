import Header from "@/components/header";
import Menu from "@/components/menu";

export default function Relatorio() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Menu />

        <div className="p-4">
          <h2>RELATORIOS</h2>
        </div>
      </div>
    </div>
  )
}