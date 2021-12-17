import Userfront from '@userfront/core';

export const requestBuilder = (method, body = null) => {

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

export const requestMaker = (endpoint, method, body = null, resolver = null, callback = null) => {
  const makeRequest = () => {
    fetch((endpoint), requestBuilder(method, body))
      .then((res => res.json()))
      .then(resolver())
      .catch(error => {
        console.log(error);
      })

    callback();
  }

  makeRequest();
}