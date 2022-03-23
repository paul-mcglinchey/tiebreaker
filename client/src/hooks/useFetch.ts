import { useEffect, useState } from "react"
import { IFetch } from "../models/fetch.model";
import { endpoints } from "../utilities";

const useFetch = <T>(url: string, options: RequestInit, deps: any[] = [], setProgress?: (progress: number) => void): IFetch<T> => {
  const [response, setResponse] = useState<T>();
  const [error, setError] = useState<undefined | Object | string>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const _fetch = async () => {
      fetch(url, options)
        .then(res => {
          if (!res.ok) {
            throw res.statusText;
          }

          return res.json();
        })
        .then(json => {
          setResponse(json as unknown as T);
        })
        .catch(err => setError(err))
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
            setProgress && setProgress(100);
          }, endpoints.origin.includes('localhost') ? 500 : 0);
        })
    }

    isMounted && _fetch();

    return () => { isMounted = false };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { response, error, isLoading };
}

export default useFetch;