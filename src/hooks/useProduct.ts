import { IProduct } from '@/utils/interface';

export function useProduct() {
  return {
    list: async() => {
      const res = await fetch('../api/products');
      return res.json();
    },
    create: async (data:Omit<IProduct,'id'>) => {
      const { createProduct } = await import('../lib/database/product.server');
      return createProduct(data);
    },
    update: async (data:IProduct) => {
      const { updateProduct } = await import('../lib/database/product.server');
      return updateProduct(data);
    },
    remove: async (id:number) => {
      const { removeProduct } = await import('../lib/database/product.server');
      return removeProduct(id);
    }
  }
}