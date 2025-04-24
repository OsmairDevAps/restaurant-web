import { listaItensPedidos } from '@/lib/database/itempedido.server';
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
    localizaritens: async(idPedido: number) => {
      const { localizarItens } = await import('@/lib/database/itempedido.server')
      return localizarItens(idPedido)
    },
    verpormesa: async(idPedido: number) => {
      const { listaItensPedidos } = await import('@/lib/database/itempedido.server')
      return listaItensPedidos(idPedido)
    },
    veritempedido: async(id: number) => {
      const { verItemPedido } = await import('@/lib/database/itempedido.server')
      return verItemPedido(id)
    },
    listaitenspedidos: async(idpedido: number) => {
      const { listaItensPedidos } = await import('@/lib/database/itempedido.server')
      return listaItensPedidos(idpedido)
    },
  }
}