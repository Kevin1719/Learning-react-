import { useState, useEffect } from 'react';

const useFetch = (API_URL) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController()
    setTimeout(() => {
      fetch(API_URL, {signal:abortCont.signal})
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw Error('🥺could not fetch the data for that resource🥺');
        } 
        return res.json();
      })
      .then(data => {
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch(err => {
        // auto catches network / connection error
        if (err.name === 'AbortError') {
          console.log('fetch aborted')
        } else {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        }
      })
    }, 3000);
    // abort the fetch
    return () => abortCont.abort();
  }, [API_URL])

  return { data, isPending, error };
}
 
export default useFetch;