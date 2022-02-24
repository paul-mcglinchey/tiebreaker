import { useEffect, useState } from "react"
import { IFetch } from "../models/fetch.model";
import { endpoints } from "../utilities";

const useFetch = (url: string, options: RequestInit, deps: any[] = []): IFetch => {
  const [response, setResponse] = useState({});
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const _fetch = async () => {
      fetch(url, options)
        .then(res => res.json())
        .then(json => setResponse(json))
        .catch(err => setError(err))
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, endpoints.origin.includes('localhost') ? 500 : 0);
        })
    }

    _fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { response, error, isLoading };
}

export default useFetch;