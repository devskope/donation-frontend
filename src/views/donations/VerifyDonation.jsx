import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import qs from 'query-string';
import {
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Segment
} from 'semantic-ui-react';

import { verifyTransaction } from '../../requests/transactions';

const VerifyDonation = () => {
  const [transactionInfo, setTransactionInfo] = React.useState({});
  const { search } = useLocation();
  const reference = React.useMemo(() => qs.parse(search).reference, [search]);

  React.useEffect(() => {
    (async () => {
      const verificationResponse = await verifyTransaction(reference);
      if (verificationResponse.data) {
        setTransactionInfo(verificationResponse.data);
      } else {
        alert(verificationResponse.error.message);
      }
    })();
  }, [reference]);

  if (!Object.keys(transactionInfo).length)
    return (
      <Container className='confirmation' textAlign='center'>
        <Icon name='spinner' size='large' loading />
      </Container>
    );

  return (
    <Container as={Grid} className='confirmation' textAlign='center'>
      {transactionInfo.data?.status === 'success' ? (
        <Grid.Column as={Segment} verticalAlign='middle' padded>
          <Header as='h2' icon size='huge'>
            <Icon name='check circle' color='green' />
            Payment Complete
            <Header.Subheader>
              Thank you, a confirmation of this transaction (
              {`ref: ${transactionInfo.data?.reference}`}) has been sent to your
              email address.
            </Header.Subheader>
          </Header>
          <Divider
            hidden
            content={<Link to='/' children='Back to homepage' />}
          />
        </Grid.Column>
      ) : (
        <Grid.Column as={Segment} verticalAlign='middle' padded>
          <Header as='h2' icon size='huge'>
            <Icon name='remove circle' color='red' />
            Payment Failed
            <Header.Subheader>
              There was an error completing the transaction (
              {`ref: ${transactionInfo.data?.reference}`}).
            </Header.Subheader>
          </Header>
          <Divider
            hidden
            content={<Link to='/' children='Back to homepage' />}
          />
        </Grid.Column>
      )}
    </Container>
  );
};

export default VerifyDonation;
