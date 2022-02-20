import { userfront } from '../models/request-header.model';

export const requestBuilder = (method: string = "GET", headers: HeadersInit = userfront(), body: any | undefined = undefined): RequestInit  => {

  const request: RequestInit = {
    method: method,
    headers: headers
  }

  if (body) {
    request.body = body;
  }

  return request;
}