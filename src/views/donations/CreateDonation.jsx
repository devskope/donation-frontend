import React from 'react';
import { Container } from 'semantic-ui-react';

import DonationForm from './components/DonationForm';

const CreateDonation = props => {
  const [loading, setLoading] = React.useState(false);
  const [purpose, setPurpose] = React.useState('');

  React.useEffect(() => {
    setPurpose(props.location.state?.purpose ?? 'Other');
  }, [props.location.state]);

  return (
    <Container className='payment'>
      <DonationForm purpose={purpose} loading={loading} />
    </Container>
  );
};

export default CreateDonation;
