import { ICaixa } from '@/utils/interface';

export function useCash() {
  return {
    list: async () => {
      const res = await fetch('../api/cash')
      return res.json();
    },
    create: async (data: Omit<ICaixa, 'id'>) => {
      const { createCash } = await import('@/lib/database/cash.server')
      return createCash(data)
    },
    update: async(data: ICaixa) => {
      const { updateCash } = await import('@/lib/database/cash.server')
      return updateCash(data)
    },
    remove: async(id: number) => {
      const { removeCash } = await import('@/lib/database/cash.server')
      return removeCash(id)
    }
  }
}