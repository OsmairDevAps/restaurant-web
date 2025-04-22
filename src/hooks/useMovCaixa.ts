import { IMovCaixa } from '@/utils/interface';

export function useMovCaixa() {
  return {
    listar: async () => {
      const res = await fetch('../api/movcaixa')
      return res.json();
    },
    criar: async (data: Omit<IMovCaixa, 'id'>) => {
      const { criaMovCaixa } = await import('@/lib/database/movcaixa.server')
      return criaMovCaixa(data)
    },
    atualizar: async(data: IMovCaixa) => {
      const { atualizaMovCaixa } = await import('@/lib/database/movcaixa.server')
      return atualizaMovCaixa(data)
    },
    excluir: async(id: number) => {
      const { excluiMovCaixa } = await import('@/lib/database/movcaixa.server')
      return excluiMovCaixa(id)
    }  }
}