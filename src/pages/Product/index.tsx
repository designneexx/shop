import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { getProductById, ProductI } from '../../utils/api/product';
import { useAddToCart } from '../../utils/hooks/useAddToCart';
import { useCart } from '../../store/StoreProvider';

const ImageWrapper = styled.div`
  width: 100%;
  height: 75vh;
  position: relative;
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const ImageContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 35px;
  font-weight: 800;
  color: #fff;
  text-transform: uppercase;
`;

const ProductContent = styled.div`
  background-color: #fff;
  padding: 35px 35px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  margin-top: 35px;
  border-radius: 5px;
`;

const Price = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.35);
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: none;
`;

const Description = styled.div`
  font-size: 18px;
  line-height: 32px;
  color: #1d1d1d;
  font-weight: normal;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 20px;
`;

const AddToCart = styled(Button)`
  &.MuiButtonBase-root {
    margin-top: 20px;
    background-color: #e91e63;
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    padding: 14px 25px;
    border-radius: 35px;
    &:hover {
      background-color: #981a4c;
    }
  }
`;

export const ProductPage: FC = observer(() => {
  const { productId } = useParams();
  const [product, setProduct] = useState<null | ProductI>(null);
  const { id, title, description, price, image } = product || {};
  const handleAddToCart = useAddToCart(id);
  const { products } = useCart();
  const hasProductInCart = products.find((productData) => productData.id === id);

  useEffect(() => {
    if (productId !== undefined) {
      getProductById(productId).then((currentProduct) => {
        setProduct(currentProduct);
      });
    }
  }, [productId]);

  return (
    <div>
      <ImageWrapper>
        <Image src={image} alt={title} />
        <ImageContent>
          {title}
          <Price>{`${price} руб.`}</Price>
        </ImageContent>
      </ImageWrapper>
      <ProductContent>
        <Description>{description}</Description>
        <AddToCart onClick={handleAddToCart}>
          {hasProductInCart
            ? `Добавить в корзину (${hasProductInCart.count})`
            : 'Добавить в корзину'}
        </AddToCart>
      </ProductContent>
    </div>
  );
});
