'use client'
import Image from "next/image";
import bglogin from '@/assets/bglogin.png'

export default function SignIn() {
  function handleLogin() {

  }

  return (
    <div className="flex flex-row w-screen h-screen">

      <aside className="w-1/2 h-screen">
        <Image src={bglogin} className="w-full h-full" alt="Creperia Tio do Crepe" />
      </aside>

      <form className="flex flex-col w-1/2 justify-center p-14">
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-bold text-4xl">TIO DO CREPE</h2>
          <h2 className="font-thin text-3xl italic tracking-[2px] border-t-[1px] border-t-slate-500">Cozinha Francesa</h2>
          <h2 className="font-bold mt-8 mb-4 text-3xl">SISTEMA DE GESTÃO (PDV)</h2>
        </div>
        <div className="flex flex-col gap-2 my-2">
          <label htmlFor="usuario" className="text-slate-600">Nome de Usuário:</label>
          <input
            className="h-12 border-[1px] border-slate-300 rounded-sm bg-slate-100"
            type="text"
            id="usuario"
            name="usuario"
          />
        </div>

        <div className="flex flex-col gap-2 my-2">
          <label htmlFor="senha" className="text-slate-600">Senha:</label>
          <input
            className="h-12 border-[1px] border-slate-300 rounded-sm bg-slate-100"
            type="password"
            id="senha"
            name="senha"
          />
        </div>
        <div className="flex flex-row justify-between items-center h-5 mb-4">
          <span className="text-slate-600">Não tenho cadastro</span>
          <span className="text-slate-600">Esqueci a senha</span>
        </div>

        <button
          className="h-14 border-2 border-slate-300 bg-fuchsia-800 text-slate-300"
          onClick={handleLogin}
        >
          Acessar
        </button>
      </form>

    </div>
  )
}