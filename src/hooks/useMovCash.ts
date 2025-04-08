import { IMovCaixa } from '@/utils/interface';

export function useMovCash() {
  return {
    list: async () => {
      const res = await fetch('../api/movcash')
      return res.json();
    },
    create: async (data: Omit<IMovCaixa, 'id'>) => {
      const { createMovCash } = await import('@/lib/database/movcash.server')
      return createMovCash(data)
    },
    update: async(data: IMovCaixa) => {
      const { updateMovCash } = await import('@/lib/database/movcash.server')
      return updateMovCash(data)
    },
    remove: async(id: number) => {
      const { removeMovCash } = await import('@/lib/database/movcash.server')
      return removeMovCash(id)
    }  }
}