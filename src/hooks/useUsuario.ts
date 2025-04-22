import { IUsuario } from '@/utils/interface';

// hooks/useUser.ts
export function useUsuario() {
  return {
    listar: async () => {
      const res = await fetch('../api/users');
      return res.json();
    },
    criar: async (data:Omit<IUsuario,'id'>) => {
      const { criaUsuario } = await import('@/lib/database/usuario.server');
      return criaUsuario(data);
    },
    logar: async (nomeusuario:string, senha:string) => {
      const { logaUsuario } = await import('@/lib/database/usuario.server');
      return logaUsuario(nomeusuario, senha);
    },
    atualizar: async (data:IUsuario) => {
      const { atualizaUsuario } = await import('@/lib/database/usuario.server');
      return atualizaUsuario(data);
    },
    excluir: async (id:number) => {
      const { excluiUsuario } = await import('@/lib/database/usuario.server');
      return excluiUsuario(id);
    }
  };
}
