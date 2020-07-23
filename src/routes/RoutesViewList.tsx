import React, { FC } from 'react';
import { DefaultLayout } from '../layouts/DefaultLayout';
import RoutesSwitch from './RoutesSwitch';
import { routes } from './index';

export const RoutesViewList: FC = () => {
  return (
    <DefaultLayout>
      <RoutesSwitch routes={routes} />
    </DefaultLayout>
  );
};
