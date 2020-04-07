import bent from 'bent';

const apiPost = bent(process.env.REACT_APP_API_URL, 'POST', 'json');

export const createTransaction = async payload => {
  const response = { data: null, error: null };

  try {
    const { data } = await apiPost('/initTx', payload);
    response.data = data;
  } catch (error) {
    response.error = await handleApiError(error);
  }

  return response;
};

export const verifyTransaction = async reference => {
  const response = { data: null, error: null };

  try {
    const { data } = await apiPost('/verifyTx', { reference });
    response.data = data;
  } catch (error) {
    response.error = await handleApiError(error);
  }

  return response;
};

const handleApiError = async error => {
  if (error.message.includes('Incorrect statusCode:')) {
    return JSON.parse(new TextDecoder().decode(await error.responseBody)).error;
  }

  return {
    message: 'An error occured. Please check your connection and try again'
  };
};