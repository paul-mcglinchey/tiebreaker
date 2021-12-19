import { useEffect, useState } from "react"

const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      await fetch(url, options)
        .then(res => res.json)
        .then(response => {
          setResponse(response)
          setIsLoading(false);
        })
        .catch(error => {
          setError(error)
          setIsLoading(false);
        })
    }

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { response, error, isLoading }
}

export default useFetch;