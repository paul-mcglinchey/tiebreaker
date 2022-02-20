import { userfront } from '../models/request-header.model';

export const requestBuilder = (method: string = "GET", headers: HeadersInit = userfront, body: Object = {}): RequestInit  => {

  const request: RequestInit = {
    method: method,
    headers: headers,
    body: body && JSON.stringify(body)
  }

  return request;
}