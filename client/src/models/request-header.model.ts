import Userfront from '@userfront/core';

export const userfront = (): HeadersInit => {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Userfront.tokens.accessToken}`
  }
}