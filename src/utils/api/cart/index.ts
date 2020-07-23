import { ShortProductI } from '../product';
import { deleteReq, getReq } from '../api';

export type CartProductT = {
  id: string;
  count: number;
  price: number;
  products: ShortProductI[];
};

export interface CartI {
  count: number;
  price: number;
  products: CartProductT[];
}

export const getCart = () => getReq('/cart', () => null);
export const addProductToCart = (productId: string) => getReq(`/cart/${productId}`, () => null);
export const deleteProductFromCart = (productId: string) =>
  deleteReq<CartProductT>(`/cart/${productId}`);
export const deleteProductsFromCart = () => deleteReq('/cart');
export const deleteParentProductsFromCart = (productId: string) =>
  deleteReq(`/cart/${productId}?parent=${true}`);
