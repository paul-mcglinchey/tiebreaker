import { useEffect, useState } from "react"

const useFetch = (url, options) => {
  const [state, setState] = useState({
    response: {},
    error: {},
    isLoading: false
  });

  useEffect(() => {
    setState({ response: {}, error: {}, isLoading: true });

    const _fetch = async () => {
      const res = await fetch(url, options);
      const json = await res.json();

      setState({
        response: json,
        error: {},
        isLoading: false
      })
    }

    _fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}

export default useFetch;