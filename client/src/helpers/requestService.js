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

export const requestMaker = (endpoint, method, body = null, resolver = [], catchHandler = null) => {
  const makeRequest = () => {
    fetch((endpoint), requestBuilder(method, body))
      .then((res => res.json()))
      .then(() => {
        resolver && resolver.length > 0 && (
          resolver.forEach(r => r())
        )
      })
      .catch(error => {
        catchHandler ? catchHandler(error) : console.log(error);
      })
  }

  makeRequest();
}