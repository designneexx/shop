import { useCallback } from 'react';
import { useCart, useProducts } from '../../store/StoreProvider';

export const useAddToCart = (productId?: string) => {
  const { addProductToCart } = useCart();
  const { products } = useProducts();
  return useCallback(() => {
    if (productId) {
      addProductToCart(productId, products);
    }
  }, [productId, products]);
};
