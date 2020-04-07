import React from 'react';
import { BrowserRouter, Link, useHistory, useLocation } from 'react-router-dom';
import { Header, Image, Icon } from 'semantic-ui-react';

import { RenderRoutes, routes } from './routes';
import logo from './assets/logo.svg';

const Back = () => {
  const location = useLocation();
  const { goBack } = useHistory();
  return (
    location.pathname === '/donate' && <Icon
      name='long arrow alternate left'
      onClick={goBack}
      size='big' />
  );
};

const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
        <header className='header'>
          <Back />
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
