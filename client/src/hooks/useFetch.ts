import { useEffect, useState } from "react"
import { IFetch } from "../models/fetch.model";
import { endpoints } from "../utilities";

const useFetch = <T>(url: string, options: RequestInit, deps: any[] = []): IFetch<T> => {
  const [response, setResponse] = useState<T>();
  const [error, setError] = useState<undefined | Object | string>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const _fetch = async () => {
      fetch(url, options)
        .then(res => {
          if (!res.ok) {
            throw res.statusText;
          }

          return res;
        })
        .then(async res => {
          const reader = res.body?.getReader();
          const contentLength: number = Number(res.headers.get('Content-Length'));
          
          let streamFinished: boolean = false;
          let receivedLength = 0;
          let chunks: Uint8Array[] = [];
          let result = "";

          if (reader) {
            while (!streamFinished) {
              await reader.read()
              .then(({done, value}) => {
                if (done) {
                  streamFinished = true;
                  return;
                }
                if (value) {
                  chunks.push(value);
                  receivedLength += value.length;
  
                  setProgress(Math.floor((receivedLength / contentLength) * 100))
                }
              })
              .then(() => {
                let chunksAll = new Uint8Array(receivedLength);
                let position = 0;
                for (let chunk of chunks) {
                  chunksAll.set(chunk, position);
                  position += chunk.length;
                }
                
                result = JSON.parse(new TextDecoder("utf-8").decode(chunksAll));
              })
              .catch(err => {
                console.error(err);
              });
            }
          }

          return result;

        })
        .then(json => {
          setResponse(json as unknown as T);
        })
        .catch(err => setError(err))
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, endpoints.origin.includes('localhost') ? 500 : 0);
        })
    }

    isMounted && _fetch();

    return () => { isMounted = false };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { response, error, isLoading, progress };
}

export default useFetch;