import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { Logotype } from '../Logotype';
import { observer } from 'mobx-react-lite';
import { useCart } from '../../store/StoreProvider';

const Wrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.14);
`;

const Container = styled.div`
  max-width: 1366px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
`;

const HeaderLink = styled(NavLink)`
  padding: 24px 20px;
  font-weight: 700;
  display: block;
  font-size: 14px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Menu = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
`;

export const Header: FC = observer(() => {
  const { count } = useCart();
  return (
    <Wrapper>
      <Container>
        <Logotype />
        <Menu>
          <Link component={HeaderLink} to="/">
            Главная
          </Link>
          <Link component={HeaderLink} to="/products">
            Витрина
          </Link>
          <Link component={HeaderLink} to="/cart">
            {count > 0 ? `Корзина (${count})` : 'Корзина'}
          </Link>
        </Menu>
      </Container>
    </Wrapper>
  );
});
