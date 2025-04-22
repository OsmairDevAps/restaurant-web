import { IProduto } from '@/utils/interface';

export function useProduto() {
  return {
    list: async() => {
      const res = await fetch('../api/produto');
      return res.json();
    },
    criar: async (data:Omit<IProduto,'id'>) => {
      const { criaProduto } = await import('../lib/database/produto.server');
      return criaProduto(data);
    },
    atualizar: async (data:IProduto) => {
      const { atualizaProduto } = await import('../lib/database/produto.server');
      return atualizaProduto(data);
    },
    localizaPorCategoria: async (idCategoria: number) => {
      const { localizaPorCategoria } = await import('@/lib/database/produto.server')
      return localizaPorCategoria(idCategoria);
    },
    excluir: async (id:number) => {
      const { excluiProduto } = await import('../lib/database/produto.server');
      return excluiProduto(id);
    }
  }
}