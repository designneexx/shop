import React from 'react';
import styled from 'styled-components';

const LogotypeWrapper = styled.div`
  font-size: 24px;
  color: #2d2d2d;
  font-weight: 700;
`;

const Dot = styled.div`
  font-size: 30px;
  font-weight: 900;
  display: inline-block;
`;

export const Logotype = () => {
  return (
    <LogotypeWrapper>
      Store
      <Dot>.</Dot>
    </LogotypeWrapper>
  );
};
