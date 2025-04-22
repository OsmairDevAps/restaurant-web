import { IItemPedido } from '@/utils/interface';

export function useItemPedido() {
  return {
    listar: async() => {
      const res = await fetch('../api/itempedido');
      return res.json();
    },
    criar: async(data: Omit<IItemPedido, 'id'>) => {
      const { criaItemPedido } = await import('@/lib/database/itempedido.server');
      return criaItemPedido(data);
    },
    atualizar: async(data: IItemPedido) => {
      const { atualizaItemPedido } = await import('@/lib/database/itempedido.server');
      return atualizaItemPedido(data);
    },
    excluir: async(id: number) => {
      const { excluiItemPedido } = await import('@/lib/database/itempedido.server')
      return excluiItemPedido(id)
    },
    localizar: async(idPedido: number) => {
      const { localizarItens } = await import('@/lib/database/itempedido.server')
      return localizarItens(idPedido)
    },
  }
}