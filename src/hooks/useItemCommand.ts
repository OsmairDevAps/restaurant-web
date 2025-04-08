import { ICommandItem } from '@/utils/interface';

export function useItemCommand() {
  return {
    list: async() => {
      const res = await fetch('../api/itemcommand');
      return res.json();
    },
    create: async(data: Omit<ICommandItem, 'id'>) => {
      const { createItemCommand } = await import('@/lib/database/itemcommand.server');
      return createItemCommand(data);
    },
    update: async(data: ICommandItem) => {
      const { updateItemCommand } = await import('@/lib/database/itemcommand.server');
      return updateItemCommand(data);
    },
    remove: async(id: number) => {
      const { removeItemCommand } = await import('@/lib/database/itemcommand.server')
      return removeItemCommand(id)
    },
  }
}