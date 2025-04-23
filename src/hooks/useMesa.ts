import { IMesa } from '@/utils/interface';

export function useMesa() {
  return {
    listar: async () => {
      const res = await fetch('../api/mesa')
      return res.json();
    },
    verMesa: async (id: number) => {
      const { verMesa } = await import('@/lib/database/mesa.server')
      return verMesa(id)
    },
    verMesaPorNumero: async (num: number) => {
      const { verMesaPorNumero } = await import('@/lib/database/mesa.server')
      return verMesaPorNumero(num)
    },
    criar: async (data: Omit<IMesa, 'id'>) => {
      const { criaMesa } = await import('@/lib/database/mesa.server')
      return criaMesa(data)
    },
    atualizar: async(data: IMesa) => {
      const { atualizaMesa } = await import('@/lib/database/mesa.server')
      return atualizaMesa(data)
    },
    excluir: async(id: number) => {
      const { excluiMesa } = await import('@/lib/database/mesa.server')
      return excluiMesa(id)
    }
  }
}