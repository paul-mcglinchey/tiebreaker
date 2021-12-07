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