import { useEffect, useRef, useState } from 'react';
import { getUserInStorage, updateUsersInStorage } from '../services';

const useUserFetch = (url: string, options: RequestInit, uuid: string, deps: any[] = []) => {
  const [response, setResponse] = useState(getUserInStorage(uuid));
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const componentIsMounted = useRef(true);

  useEffect(() => {
    const _fetch = async () => {

      setIsLoading(true);

      await fetch(url, options)
        .then(res => res.json())
        .then(json => {
          setResponse(json);
          updateUsersInStorage(uuid, json);
        })
        .catch(err => setError(err))
        
      setIsLoading(false);
    }

    if (!response && componentIsMounted) {
      _fetch();
    }

    return () => {
      componentIsMounted.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { response, error, isLoading };
}

export default useUserFetch;