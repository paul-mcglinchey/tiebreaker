import { useEffect, useState } from "react"
import { IFetch } from "../models/fetch.model";
import { endpoints } from "../utilities";

const useFetch = <T>(url: string, options: RequestInit, deps: any[] = []): IFetch<T> => {
  const [response, setResponse] = useState<T>();
  const [error, setError] = useState<undefined | Object | string>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setProgress(0);

    const _fetch = async () => {
      fetch(url, options)
        .then(res => {
          if (!res.ok) {
            throw res.statusText;
          }

          return res;
        })
        .then(res => res.json())
        .then(json => {
          setResponse(json);
          setProgress(100);
        })
        .catch(err => setError(err))
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, endpoints.origin.includes('localhost') ? 500 : 0);
        })
    }

    isMounted && _fetch();

    return () => { isMounted = false };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { response, error, isLoading, progress };
}

export default useFetch;