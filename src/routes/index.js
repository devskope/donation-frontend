import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from "../views/home/index";
import CreateDonation from "../views/donations/CreateDonation";
import VerifyDonation from "../views/donations/VerifyDonation";

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    exact={route.exact}
    render={props => (
      <route.component
        {...props}
        {...route.componentProps}
        routes={route.routes}
      />
    )}
  />
);

export const RenderRoutes = ({ routes }) => (
  <Switch>
    {routes.map((route, i) => {
      return <RouteWithSubRoutes key={route.key} {...route} />;
    })}
    <Route
      render={() => <h1 className='page'>Requested resource not found!</h1>}
    />
  </Switch>
);

export const routes = [
  { path: '/', key: 'home', component: Home, exact: true },
  {
    path: '/donate',
    key: 'donation',
    component: RenderRoutes,
    routes: [
      {
        path: '/donate',
        key: 'createDonation',
        component: CreateDonation,
        exact: true,
      },
      {
        path: '/donate/verify',
        key: 'verifyDonation',
        component: VerifyDonation,
        exact: true,
      }

    ]
  }
];
