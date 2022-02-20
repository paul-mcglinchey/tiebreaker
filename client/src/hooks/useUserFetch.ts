import { useEffect, useState } from 'react';
import { getUserInStorage, updateUsersInStorage } from '../services';

const useUserFetch = (url: string, options: RequestInit, uuid: string, deps: any[] = []) => {
  const [user, setUser] = useState(getUserInStorage(uuid));
  const [error, setError] = useState({});

  useEffect(() => {
    const _fetch = async () => {
      fetch(url, options)
        .then(res => res.json())
        .then(json => setUser(json))
        .catch(err => setError(err))
    }

    if (user) {
      _fetch();
      updateUsersInStorage(uuid, user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { user, error };
}

export default useUserFetch;