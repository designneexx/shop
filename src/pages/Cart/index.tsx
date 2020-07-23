import React, { FC } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useCart } from '../../store/StoreProvider';
import { Product } from '../../Components/Product';
import { Container } from '../Products';

const Heading = styled.div`
  font-size: 26px;
  font-weight: 500;
  margin-bottom: 30px;
`;

const Notification = styled.div`
  font-size: 20px;
  margin-top: 30px;
  margin-bottom: 20px;
`;

const RemoveParent = styled.button`
  background-color: #e91e6347;
  color: #fff;
  margin-left: 15px;
  padding: 5px 10px;
  border-radius: 35px;
`;

const Panel = styled(Accordion)`
  margin-bottom: 30px;
`;

export const CartPage: FC = observer(() => {
  const { products, count, price, deleteProduct, clear } = useCart();

  const handleDeleteParent = (id: string) => {
    return () => {
      deleteProduct(id, 0, true);
    };
  };

  const handleDelete = (id: string, idx: number) => {
    return () => {
      deleteProduct(id, idx);
    };
  };

  return (
    <div>
      <Heading>Ваша корзина</Heading>
      {products.map((productData) => {
        const name = productData.products[0].title;

        return (
          <Panel>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{name}</Typography>
              <RemoveParent onClick={handleDeleteParent(productData.id)}>Удалить</RemoveParent>
            </AccordionSummary>
            <AccordionDetails>
              <Container visibleType="grid">
                {productData.products.map((product, idx) => {
                  return (
                    <div>
                      <Product isCart {...product} />
                      <Button onClick={handleDelete(productData.id, idx)}>Удалить</Button>
                    </div>
                  );
                })}
              </Container>
            </AccordionDetails>
          </Panel>
        );
      })}
      <Notification>
        У вас
        <strong>{` ${count} товаров `}</strong>
        на сумму
        <strong>{` ${price} рублей`}</strong>
      </Notification>
      <Button>Купить</Button>
      <Button onClick={clear}>Удалить все</Button>
    </div>
  );
});
