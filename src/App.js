import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { Header, Image } from 'semantic-ui-react';

import { RenderRoutes, routes } from './routes';
import logo from './assets/logo.svg';

const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
        <header className='header'>
          <Header as={Link} to='/'>
            <Image className='logo' centered src={logo} alt='logo' />
            <br />
            Donation Portal
          </Header>
        </header>
        <RenderRoutes routes={routes} />
      </BrowserRouter>
    </div>
  );
};

export default App;