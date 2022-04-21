import useAuth from "./useAuth";

const useRequestBuilder = () => {

  const authToken = useAuth().getToken();

  const requestBuilder = (method: string = "GET", bearerToken: string | undefined = undefined, body: any | undefined = undefined): RequestInit  => {

    const request: RequestInit = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken || authToken}`
      }
    }
  
    if (body) {
      request.body = JSON.stringify(body);
    }
  
    return request;
  }

  return { requestBuilder }
}

export default useRequestBuilder;