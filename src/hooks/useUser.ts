import { IUser } from '@/utils/interface';

// hooks/useUser.ts
export function useUser() {
  return {
    list: async () => {
      const res = await fetch('../api/users');
      return res.json();
    },
    create: async (data:Omit<IUser,'id'>) => {
      const { createUser } = await import('@/lib/database/user.server');
      return createUser(data);
    },
    login: async (user:string, password:string) => {
      const { loginUser } = await import('@/lib/database/user.server');
      return loginUser(user, password);
    },
    update: async (data:IUser) => {
      const { updateUser } = await import('@/lib/database/user.server');
      return updateUser(data);
    },
    remove: async (id:number) => {
      const { deleteUser } = await import('@/lib/database/user.server');
      return deleteUser(id);
    }
  };
}
