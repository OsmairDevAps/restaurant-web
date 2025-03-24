'use client'
import Image from "next/image";
import bglogin from '@/assets/bglogin.png'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignIn() {
  function handleLogin() {
  }

  return (
    <div className="flex flex-row w-screen h-screen">

      <aside className="w-1/2 h-screen">
        <Image src={bglogin} className="w-full h-full" alt="Creperia Tio do Crepe" />
      </aside>

      <div className="flex flex-col w-1/2 justify-center p-32">
        <form className="flex flex-col gap-6 w-full justify-center p-2">
          <div className="flex flex-col justify-center items-center">
            <h2 className="font-bold text-4xl">TIO DO CREPE</h2>
            <h2 className="font-thin text-3xl italic tracking-[2px] border-t-[1px] border-t-slate-500">Cozinha Francesa</h2>
            <h2 className="font-bold mt-8 mb-4 text-3xl">SISTEMA DE GESTÃO (PDV)</h2>
          </div>

          <div className="flex flex-col gap-2 my-2">
            <label htmlFor="usuario" className="text-slate-600">Nome de Usuário:</label>
            <Input 
              type="text"
              id="usuario"
              name="usuario"
            />
          </div>

          <div className="flex flex-col gap-2 my-2">
            <label htmlFor="senha" className="text-slate-600">Senha:</label>
            <Input 
              type="password"
              id="senha"
              name="senha"
            />
            <div className="flex flex-row justify-between items-center h-5 mb-4">
              <span className="text-slate-600">Não tenho cadastro</span>
              <span className="text-slate-600">Esqueci a senha</span>
            </div>
          </div>

          <Button onClick={handleLogin}>
            Acessar
          </Button>
        </form>
      </div>

    </div>
  )
}