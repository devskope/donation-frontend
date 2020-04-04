import React from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import PurposeTile from './components/PurposeTile';

const Home = props => {
  const givingCategories = ['First', 'Second', 'Third'];

  return (
    <Container className='page landing' textAlign='center'>
      <Header className='lede' size='huge' content='Giving' />
      <Grid columns={3} padded stackable>
        <Grid.Row>
          {givingCategories.map((purpose, key) => (
            <PurposeTile key={key} purpose={purpose} />
          ))}
        </Grid.Row>
        <Grid.Row centered>
          <PurposeTile />
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Home;
