import Userfront from '@userfront/core';

const requestBuilder = (method, body = null) => {

  const request = {
    'method': method,
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Userfront.tokens.accessToken}`
    }
  }

  if (body) {
    request.body = JSON.stringify(body);
  }

  return request;
}

const requestMaker = (endpoint, method, body = null) => {
  const makeRequest = () => {
    fetch((endpoint), requestBuilder(method, body))
      .catch(err => console.log(err));
  }

  makeRequest();
}

const requestHelper = {
  requestBuilder,
  requestMaker
}

export default requestHelper;