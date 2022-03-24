import { useEffect, useRef, useState } from "react"
import { IFetch } from "../models/fetch.model";

const useFetch = <T>(url: string, options: RequestInit, deps: any[] = []): IFetch<T> => {
  const [response, setResponse] = useState<T>();
  const [error, setError] = useState<undefined | Object | string>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const componentIsMounted = useRef(true);
  const myController = new AbortController();
  const mySignal = myController.signal;

  useEffect(() => {
    const _fetch = async () => {

      if (componentIsMounted) setIsLoading(true);
      
      options['signal'] = mySignal;

      fetch(url, options)
        .then(res => {
          if (!res.ok) {
            throw res.statusText;
          }

          return res.json();
        })
        .then(json => {
          if (componentIsMounted) setResponse(json as unknown as T);
        })
        .catch(err => {
          if (componentIsMounted) setError(err)
        })
        .finally(() => {
          if (componentIsMounted) setIsLoading(false);
        })
    }

    componentIsMounted && _fetch();

    return () => {
      componentIsMounted.current = false;
      myController.abort();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { response, error, isLoading };
}

export default useFetch;