import React, { FC, memo } from 'react';
import { Switch, Route } from 'react-router';
import { RouteI } from '.';

export const RoutesSwitch: FC<{ routes: RouteI[] }> = memo(({ routes, ...rest }) => {
  return (
    <Switch>
      {routes.map(({ name, path, routes: itemRoutes, redirect, exact, Component }) => (
        <Route key={`${path}${name}`} path={path} exact={exact}>
          <Component routes={itemRoutes} redirect={redirect} {...rest} />
        </Route>
      ))}
    </Switch>
  );
});

export default RoutesSwitch;
