import React from 'react';
import { Container } from 'semantic-ui-react';

import { createTransaction } from '../../requests/transactions';
import DonationForm from './components/DonationForm';

const CreateDonation = props => {
  const [loading, setLoading] = React.useState(false);
  const [purpose, setPurpose] = React.useState('');

  React.useEffect(() => {
    setPurpose(props.location.state?.purpose ?? 'Other');
  }, [props.location.state]);

  const handleSubmit = async payload => {
    setLoading(true);
    const response = await createTransaction(payload);
    if (response.data) {
      window.location.assign(response.data.data.authorization_url);
    } else {
      setLoading(false);
      alert(`An error Ocurred:
        message: ${response.error.message}
        reason: ${response.error.responseBody?.message ?? 'An error occured'}
      `);
    }
  };

  return (
    <Container className='payment'>
      <DonationForm purpose={purpose} loading={loading} submit={handleSubmit} />
    </Container>
  );
};

export default CreateDonation;
