import { validator } from './helpers';

const formValidator = fields => {
  const { isEmail, notEmpty } = validator;
  const validatedFields = {
    email: {
      isValid: isEmail(fields.email),
      errorMessage: 'Please provide a valid email'
    },
    ...(fields.purpose === 'second' && {
      purposeExtra: {
        isValid:
          (isFinite(fields.purposeExtra) && fields.purposeExtra > 0) ||
          fields.titheCardNumber === 'None',
        errorMessage: 'Please provide extra details'
      }
    }),
    amount: {
      isValid: fields.amount >= 100,
      errorMessage: 'Amount must be at least ₦100'
    },
    ...(fields.purpose === 'other' && {
      description: {
        isValid: notEmpty(fields.description),
        errorMessage: 'Please add a description note'
      }
    })
  };
  const isValid = Object.keys(validatedFields)
    .map(field => validatedFields[field].isValid)
    .every(Boolean);
  const fieldErrors = Object.entries(validatedFields).reduce(
    (errors, [fieldName, fieldValidation]) => {
      if (fieldValidation.isValid) return errors;
      return { ...errors, ...{ [fieldName]: fieldValidation.errorMessage } };
    },
    {}
  );
  return { isValid, fieldErrors };
};

export default formValidator;
