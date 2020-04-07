import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Input,
  Message,
  Segment
} from 'semantic-ui-react';

import formValidator from '../../../utils/donationFormValidator';

const formState = {
  errors: {},
  fields: {
    email: '',
    firstName: '',
    lastName: '',
    purpose: '',
    purposeExtra: '',
    description: '',
    amount: ''
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'form': {
      return { ...state, [action.fieldName]: action.fieldValue };
    }
    case 'formField': {
      const { fieldName, fieldValue } = action;
      const fields = { ...state.fields };
      fields[fieldName] = fieldValue;

      return { ...state, fields };
    }
    default:
      break;
  }
};

const DonationForm = props => {
  const [state, formStateDispatch] = React.useReducer(reducer, formState);

  const { fields } = state;
  const formHasErrors = Boolean(Object.keys(state.errors).length);
  const validator = formValidator(fields);

  React.useEffect(() => {
    updateFieldState('purpose', props.purpose.toLowerCase());
  }, [props.purpose]);

  React.useEffect(() => {
    if (validator.isValid) {
      updateFormState('errors', {});
    }
  }, [validator.isValid]);

  const updateFormState = (fieldName, fieldValue) => {
    formStateDispatch({
      type: 'form',
      fieldName,
      fieldValue
    });
  };

  const updateFieldState = (fieldName, fieldValue) => {
    formStateDispatch({
      type: 'formField',
      fieldName,
      fieldValue
    });
  };

  const submit = e => {
    e.preventDefault();
    if (validator.isValid) {
      const payload = {
        email: fields.email,
        amount: fields.amount,
        metadata: {
          custom_fields: [
            {
              display_name: 'Name',
              variable_name: 'name',
              value: `${fields.firstName} ${fields.lastName}`.trim()
            },
            {
              display_name: 'Description',
              variable_name: 'description',
              value: fields.description
            },
            {
              display_name: 'Purpose',
              variable_name: 'purpose',
              value: fields.purpose
            },
            {
              display_name: 'Purpose Extra',
              variable_name: 'purpose_extra',
              value: fields.purposeExtra
            }
          ]
        }
      };
      props.submit(payload);
    } else updateFormState('errors', validator.fieldErrors);
  };

  return (
    <Segment className='form-container' raised>
      <Grid
        as={Form}
        stackable
        className='form'
        loading={props.loading}
        size='large'
      >
        <Grid.Column>
          <Container textAlign='center'>
            <Header
              content='Kindly provide the following details:'
              size='small'
            />
          </Container>

          <Divider hidden />

          <Grid.Row as={Form.Group} widths='equal'>
            <Form.Field
              control={Form.Input}
              label='First Name'
              value={fields.firstName}
              onChange={e => updateFieldState('firstName', e.target.value)}
            />
            <Form.Field
              control={Form.Input}
              label='Last Name'
              value={fields.lastName}
              onChange={e => updateFieldState('lastName', e.target.value)}
            />
          </Grid.Row>

          <Grid.Row
            as={Form.Field}
            control={Form.Input}
            label='Email'
            type='email'
            value={fields.email}
            onChange={e => updateFieldState('email', e.target.value)}
            required
          />

          <Grid.Row as={Form.Group} widths='equal'>
            <Form.Field
              control={Form.Input}
              label='Purpose'
              value={props.purpose}
              readOnly
            />

            {fields.purpose === 'second' && (
              <>
                <Form.Field
                  control={Form.Input}
                  list='opts'
                  label='Extra'
                  title='Please provide the extra details or enter None'
                  value={fields.purposeExtra}
                  onChange={e =>
                    updateFieldState('purposeExtra', e.target.value)
                  }
                  required
                />
                <datalist id='opts'>
                  <option value='None' />
                </datalist>
              </>
            )}
          </Grid.Row>

          <Grid.Row as={Form.Field} width='16'>
            <b className='label'>Amount</b>
            <Input
              className='amount-field'
              label={{ basic: true, content: '₦' }}
              labelPosition='left'
              type='number'
              min='0.00'
              step='0.01'
              value={fields.amount}
              onChange={e => updateFieldState('amount', e.target.value)}
              required
            />
          </Grid.Row>

          <Grid.Row
            as={Form.TextArea}
            label='Description'
            rows='6'
            value={fields.description}
            onChange={e => updateFieldState('description', e.target.value)}
            required={fields.purpose === 'other'}
          />

          <Form.Button
            color={validator.isValid ? 'green' : 'red'}
            content='Proceed'
            size='large'
            onClick={submit}
          />
        </Grid.Column>
      </Grid>

      {formHasErrors && (
        <Message
          list={Object.values(state.errors)}
          onDismiss={() => updateFormState('errors', {})}
          size='large'
          error
        />
      )}
    </Segment>
  );
};

DonationForm.defaultProps = {
  purpose: 'Other',
  loading: false,
  submit: f => f
};

DonationForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  purpose: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired
};

export default DonationForm;
