import { useEffect, useRef, useState } from "react"
import { IFetch } from "../models/fetch.model";

interface ICache<T> {
  [key: string]: T
}

const useFetch = <T>(url: string, options: RequestInit, deps: any[] = [], useCache: boolean = false): IFetch<T> => {
  const [response, setResponse] = useState<T>();
  const [error, setError] = useState<undefined | Object | string>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const cache = useRef<ICache<T>>({});

  useEffect(() => {
    let componentIsMounted = true;

    if (!url) return;

    const _fetch = async () => {

      if (componentIsMounted) setIsLoading(true);

      if (cache.current[url] && useCache) {
        if (componentIsMounted) {
          setResponse(cache.current[url])
          setIsLoading(false);
        }
        return;
      } else {
        fetch(url, options)
          .then(res => {
            if (!res.ok) throw new Error(res.statusText)

            return res.json();
          })
          .then(json => {
            if (componentIsMounted) {
              setResponse(json as unknown as T);
              cache.current[url] = json;
            }
          })
          .catch(err => {
            if (componentIsMounted) setError(err)
          })
          .finally(() => {
            if (componentIsMounted) setIsLoading(false);
          })
      }

    }

    componentIsMounted && _fetch();

    return () => {
      componentIsMounted = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { response, error, isLoading };
}

export default useFetch;