import Userfront from '@userfront/core';

export const userfront: HeadersInit = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${Userfront.tokens.accessToken}`
}

export const userfrontapi: HeadersInit = {
  'Content-Type': 'application/json',
  'Authorization': "Bearer uf_test_admin_vbqqjp7b_300309fb7cdd0a5ce03305d1da2e0938"
}