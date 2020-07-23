import React, { FC, memo, useEffect } from 'react';
import styled from 'styled-components';
import { Header } from '../Components/Header';
import {useCart, useProducts} from '../store/StoreProvider';

const Container = styled.div`
  max-width: 1366px;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  margin: 75px auto;
`;

export const DefaultLayout: FC = memo(({ children }) => {
  const productsStore = useProducts();
  const cartStore = useCart();

  useEffect(() => {
    productsStore.init();
    cartStore.init();
  }, []);

  return (
    <div>
      <Header />
      <Container>{children}</Container>
    </div>
  );
});
