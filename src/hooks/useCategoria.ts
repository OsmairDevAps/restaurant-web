import { ICategoria } from '@/utils/interface';

export function useCategoria() {
  return {
    listar: async () => {
      const res = await fetch('../api/categoria')
      return res.json();
    },
    verCategoria: async (id: number) => {
      const { verCategoria } = await import('@/lib/database/categoria.server')
      return verCategoria(id)
    },
    criar: async (data: Omit<ICategoria, 'id'>) => {
      const { criaCategoria } = await import('@/lib/database/categoria.server')
      return criaCategoria(data)
    },
    atualizar: async(data: ICategoria) => {
      const { atualizaCategoria } = await import('@/lib/database/categoria.server')
      return atualizaCategoria(data)
    },
    excluir: async(id: number) => {
      const { excluiCategoria } = await import('@/lib/database/categoria.server')
      return excluiCategoria(id)
    }  }
}