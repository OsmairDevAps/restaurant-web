import { ICaixa } from '@/utils/interface';

export function useCaixa() {
  return {
    listar: async () => {
      const res = await fetch('../api/caixa')
      return res.json();
    },
    criar: async (data: Omit<ICaixa, 'id'>) => {
      const { criaCaixa } = await import('@/lib/database/caixa.server')
      return criaCaixa(data)
    },
    atualizar: async(data: ICaixa) => {
      const { atualizaCaixa } = await import('@/lib/database/caixa.server')
      return atualizaCaixa(data)
    },
    excluir: async(id: number) => {
      const { excluiCaixa } = await import('@/lib/database/caixa.server')
      return excluiCaixa(id)
    }
  }
}