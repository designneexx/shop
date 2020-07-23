import React, { FC, memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Link as MLink, Button } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { useAddToCart } from '../../utils/hooks/useAddToCart';
import { ShortProductI } from '../../utils/api/product';
import { useCart } from '../../store/StoreProvider';

const Wrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 160px;
  position: relative;
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const ImageContent = styled(Link)`
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
  &.MuiTypography-colorPrimary {
    color: #fff;
  }
  font-size: 14px;
  font-weight: 700;
`;

const Header = styled(Link)`
  padding-top: 25px;
  padding-bottom: 25px;
  text-decoration: none;
  letter-spacing: 2px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-weight: 600;
  color: #2d2d2d;
`;

const ProductButton = styled(Button)`
  &.MuiButton-root {
    width: 100%;
    border: 1px solid #00bcd4;
    color: #00bcd4;
    border-radius: 30px;
    font-size: 13px;
    font-weight: 600;
    max-width: max-content;
    padding-left: 25px;
    padding-right: 25px;
  }
`;

const ButtonContainer = styled.div`
  background-color: #f1f1f1;
  padding: 14px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Product: FC<ShortProductI & { isCart?: boolean }> = memo(
  observer(({ price, title, image, id, isCart }) => {
    const handleAddToCart = useAddToCart(id);
    const { products } = useCart();
    const hasProductInCart = products.find((product) => product.id === id);

    return (
      <Wrapper>
        <ImageWrapper>
          <Image src={image} alt={title} />
          <MLink component={ImageContent} to={`/products/${id}`}>
            {`${price} руб.`}
          </MLink>
        </ImageWrapper>
        <div>
          <Header to={`/products/${id}`}>{title}</Header>
          {!isCart && (
            <ButtonContainer>
              <ProductButton onClick={handleAddToCart}>
                {hasProductInCart
                  ? `Добавить в корзину (${hasProductInCart.count})`
                  : 'Добавить в корзину'}
              </ProductButton>
            </ButtonContainer>
          )}
        </div>
      </Wrapper>
    );
  }),
);
