import React, { createContext, FC, memo, useContext } from 'react';
import { useLocalStore } from 'mobx-react-lite';
import { CartStoreI, createCartStore } from './modules/cart.store';
import { createProductStore, ProductStoreI } from './modules/products.store';

export interface StoreI {
  cart: CartStoreI;
  products: ProductStoreI;
}

const StoreContext = createContext<StoreI | null>(null);

export const StoreProvider: FC = memo(({ children }) => {
  const cart = useLocalStore(createCartStore);
  const products = useLocalStore(createProductStore);
  const store = { cart, products };

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
});

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw Error("Store shouldn't be null");
  }
  return store;
};

export const useCart = () => useStore().cart;
export const useProducts = () => useStore().products;
