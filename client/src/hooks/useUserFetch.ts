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
        .then(json => console.log('json:', json))
        .catch(err => setError(err))
    }
    console.log('response:', response)
    if (!response) {
      _fetch();
      console.log('response after fetching:', response)
      updateUsersInStorage(uuid, response);
    }

    if (error) {
      console.error(error);
    }

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { response, error, isLoading };
}

export default useUserFetch;