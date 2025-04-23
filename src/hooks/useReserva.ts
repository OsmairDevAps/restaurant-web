import { IReserva } from '@/utils/interface';

export function useReserva() {
  return {
    listar: async () => {
      const res = await fetch('../api/reserva');
      return res.json();
    },
    criar: async (data:Omit<IReserva,'id'>) => {
      const { criaReserva } = await import('@/lib/database/reserva.server');
      return criaReserva(data);
    },
    atualizar: async (data:IReserva) => {
      const { atualizaReserva } = await import('@/lib/database/reserva.server');
      return atualizaReserva(data);
    },
    excluir: async (id:number) => {
      const { excluiReserva } = await import('@/lib/database/reserva.server');
      return excluiReserva(id);
    }
  };
}
