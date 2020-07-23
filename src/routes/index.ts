import { FC } from 'react';
import { HomePage } from '../pages';
import { ProductPage } from '../pages/Product';
import { ProductsPage } from '../pages/Products';
import { CartPage } from '../pages/Cart';

export interface RouteI {
  name: string;
  path: string;
  Component: FC<{ redirect?: string; routes?: RouteI[] }>;
  redirect?: string;
  exact?: boolean;
  routes?: RouteI[];
}

export const routes: RouteI[] = [
  {
    name: 'Главная',
    path: '/',
    exact: true,
    Component: HomePage,
  },
  {
    name: 'Витрина',
    path: '/products',
    exact: true,
    Component: ProductsPage,
  },
  {
    name: 'Корзина',
    path: '/cart',
    exact: true,
    Component: CartPage,
  },
  {
    name: 'Страница товара',
    path: '/products/:productId',
    exact: true,
    Component: ProductPage,
  },
];
