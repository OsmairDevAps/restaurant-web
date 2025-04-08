import { ICommand } from '@/utils/interface';

export function useCommand() {
  return {
    list: async () => {
      const res = await fetch('../api/command')
      return res.json();
    },
    create: async (data: Omit<ICommand, 'id'>) => {
      const { createCommand } = await import('@/lib/database/command.server')
      return createCommand(data)
    },
    update: async(data: ICommand) => {
      const { updateCommand } = await import('@/lib/database/command.server')
      return updateCommand(data)
    },
    remove: async(id: number) => {
      const { removeCommand } = await import('@/lib/database/command.server')
      return removeCommand(id)
    }
  }
}