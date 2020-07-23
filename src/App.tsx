import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { StoreProvider } from './store/StoreProvider';
import { RoutesViewList } from './routes/RoutesViewList';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    box-sizing: border-box;
    font-family: "Montserrat", sans-serif;
    &:after,
    &:before {
      margin: 0;
      padding: 0;
      border: none;
      outline: none;
      box-sizing: border-box;
      font-family: "Montserrat", sans-serif;
    }
  }
`;

export const App: FC = () => {
  return (
    <BrowserRouter>
      <StoreProvider>
        <ThemeProvider theme={{} as any}>
          <GlobalStyle />
          <RoutesViewList />
        </ThemeProvider>
      </StoreProvider>
    </BrowserRouter>
  );
};
