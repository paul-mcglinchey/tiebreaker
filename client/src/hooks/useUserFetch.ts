import { useEffect, useState } from 'react';
import { IUser } from '../models';
import { IFetch } from '../models/fetch.model';
import { getUserInStorage, updateUsersInStorage } from '../services';

const useUserFetch = (url: string, options: RequestInit, uuid: string, deps: any[] = []): IFetch<IUser> => {
  const [response, setResponse] = useState<IUser | undefined>(getUserInStorage(uuid));
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const _fetch = async () => {

      setIsLoading(true);
      setProgress(0);

      await fetch(url, options)
        .then(res => res.json())
        .then(json => {
          setResponse(json);
          updateUsersInStorage(uuid, json);
        })
        .catch(err => setError(err))
        
      setIsLoading(false);
    }

    if (!response) {
      _fetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { response, error, isLoading, progress };
}

export default useUserFetch;