import Userfront from '@userfront/core';

export const requestBuilder = (method, body = null) => {

  const auth = {
    token: `Bearer ${Userfront.tokens.accessToken}`,
    user: Userfront.user
  }

  const request = {
    'method': method,
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': JSON.stringify(auth)
    }
  }

  if (body) {
    request.body = JSON.stringify(body);
  }

  return request;
}