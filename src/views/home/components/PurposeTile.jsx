import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const PurposeTile = ({ purpose }) => {
  return (
    <Grid.Column
      className='purpose-tile-column'
      as={Segment}
      textAlign='center'
      basic
    >
      <Link
        to={{
          pathname: '/donate',
          state: { purpose }
        }}
      >
        <Segment className='tile' padded='very'>
          <Header content={purpose} />
        </Segment>
      </Link>
    </Grid.Column>
  );
};

PurposeTile.defaultProps = {
  purpose: 'Other'
};

PurposeTile.propTypes = {
  purpose: PropTypes.string
};

export default PurposeTile;
