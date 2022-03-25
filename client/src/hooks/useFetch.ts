import { useEffect, useState } from "react"
import { IFetch } from "../models/fetch.model";

const useFetch = <T>(url: string, options: RequestInit, deps: any[] = []): IFetch<T> => {
  const [response, setResponse] = useState<T>();
  const [error, setError] = useState<undefined | Object | string>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let componentIsMounted = true;
    
    const _fetch = async () => {
      
      if (componentIsMounted) setIsLoading(true);

      fetch(url, options)
        .then(res => {
          if (!res.ok) {
            if (componentIsMounted) throw res.statusText;
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
      componentIsMounted = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { response, error, isLoading };
}

export default useFetch;