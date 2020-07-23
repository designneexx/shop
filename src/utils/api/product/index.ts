import { getReq } from '../api';
import { products } from '../../../products';

export interface ShortProductI {
  id: string;
  image: string;
  title: string;
  price: number;
  sellerId: string;
}

export interface ProductI extends ShortProductI {
  description: string;
}

export type ProductsT = ShortProductI[];

export const getProducts = () => getReq('/products', () => products);
export const getProductById = (productId: string) =>
  getReq<ProductI>(`/products/${productId}`, () => {
    const product: any = products.find(({ id }) => id === productId);
    return product;
  });
