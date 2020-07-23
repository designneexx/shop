import { getProducts, ProductsT } from '../../utils/api/product';

export interface ProductStoreI {
  init(): Promise<ProductsT>;
  products: ProductsT;
}

export const createProductStore = (): ProductStoreI => ({
  products: [],
  async init() {
    const products = await getProducts();
    this.products = products as any;
    return products as any;
  },
});
