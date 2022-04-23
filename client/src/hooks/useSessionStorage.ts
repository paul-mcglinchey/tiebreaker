import { useEffect, useState } from "react";
import { IFetch } from "../models";
import { getJsonItemInStorage, setJsonItemInStorage } from "../services";
import useIsMounted from "./useIsMounted";

const useSessionStorage = <T>(url: string, options: RequestInit, deps: any[] = [], resetCache: boolean = false): IFetch<T> => {
  const [response, setResponse] = useState<T>();
  const [error, setError] = useState<undefined | Object | string>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useIsMounted();

  useEffect(() => {
    const data = getJsonItemInStorage(url);

    const _fetch = async () => {
      if (data && !resetCache) {
        if (isMounted()) {
          setResponse(data);
          setIsLoading(false);
        }
      } else {
        fetch(url, options)
          .then(res => {
            if (!res.ok) {
              if (isMounted()) throw res.statusText;
            }

            return res.json();
          })
          .then(json => {
            if (isMounted()) {
              setResponse(json as unknown as T);
              setJsonItemInStorage(url, json);
            }
          })
          .catch(err => {
            if (isMounted()) setError(err)
          })
          .finally(() => {
            if (isMounted()) setIsLoading(false);
          })
      }
    }

    isMounted() && _fetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { response, error, isLoading }
}

export default useSessionStorage;