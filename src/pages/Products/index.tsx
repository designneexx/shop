import React, { FC, memo, useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { MenuItem, Select } from '@material-ui/core';
import { useProducts } from '../../store/StoreProvider';
import { Product } from '../../Components/Product';

type VisibleT = 'grid' | 'column';

export const Container = styled.div<{ visibleType: VisibleT }>`
  display: grid;
  grid-template-columns: ${({ visibleType }) =>
    visibleType === 'grid' ? 'repeat(4, 1fr)' : '1fr'};
  grid-gap: 35px;
  margin: auto;
  width: 100%;
`;

export const ProductsPage: FC = memo(
  observer(() => {
    const [val, setVal] = useState<VisibleT>('grid');
    const { products } = useProducts();
    const handleChangeVisible = useCallback(({ target: { value } }: any) => {
      setVal(value);
    }, []);

    return (
      <>
        <Select value={val} onChange={handleChangeVisible} label="Вид отображения">
          <MenuItem value="grid">Плитка</MenuItem>
          <MenuItem value="column">В ряд</MenuItem>
        </Select>
        <Container visibleType={val}>
          {products.map((product) => (
            <Product {...product} />
          ))}
        </Container>
      </>
    );
  }),
);
