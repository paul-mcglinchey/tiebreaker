import { useEffect, useState } from "react"

const useFetch = (url, options, deps = []) => {
  const [response, setResponse] = useState({});
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const _fetch = async () => {
      fetch(url, options)
        .then(res => res.json())
        .then(json => setResponse(json))
        .catch(err => setError(err))

      setIsLoading(false);
    }

    _fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { response, error, isLoading };
}

export default useFetch;