import { ICategory } from '@/utils/interface';

export function useCategory() {
  return {
    list: async () => {
      const res = await fetch('../api/category')
      return res.json();
    },
    create: async (data: Omit<ICategory, 'id'>) => {
      const { createCategory } = await import('@/lib/database/category.server')
      return createCategory(data)
    },
    update: async(data: ICategory) => {
      const { updateCategory } = await import('@/lib/database/category.server')
      return updateCategory(data)
    },
    remove: async(id: number) => {
      const { removeCategory } = await import('@/lib/database/category.server')
      return removeCategory(id)
    }  }
}