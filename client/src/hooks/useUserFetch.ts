import { useEffect, useState } from 'react';
import { getUserInStorage, updateUsersInStorage } from '../services';

const useUserFetch = (url: string, options: RequestInit, uuid: string, deps: any[] = []) => {
  const [response, setResponse] = useState(getUserInStorage(uuid));
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const _fetch = async () => {
      fetch(url, options)
        .then(res => res.json())
        .then(json => setResponse(json))
        .catch(err => setError(err))
    }

    if (response) {
      _fetch();
      updateUsersInStorage(uuid, response);
    }

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { response, error, isLoading };
}

export default useUserFetch;