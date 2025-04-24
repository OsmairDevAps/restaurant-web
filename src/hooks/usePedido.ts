import { IPedido } from '@/utils/interface';

export function usePedido() {
  return {
    listar: async () => {
      const res = await fetch('../api/pedido')
      return res.json();
    },
    verPedido: async (id: number) => {
      const { verPedido } = await import('@/lib/database/pedido.server')
      return verPedido(id)
    },
    verPedidosPorMesa: async (idmesa: number) => {
      const { verPedidosPorMesa } = await import('@/lib/database/pedido.server')
      return verPedidosPorMesa(idmesa)
    },
    criar: async (data: Omit<IPedido, 'id'>) => {
      const { criaPedido } = await import('@/lib/database/pedido.server')
      return criaPedido(data)
    },
    excluir: async(id: number) => {
      const { excluiPedido } = await import('@/lib/database/pedido.server')
      return excluiPedido(id)
    }
  }
}