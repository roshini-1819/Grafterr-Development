import { useCallback, useEffect, useRef, useState } from 'react';


export function useContent(fetcher) {
  const [state, setState] = useState({
    status: 'loading', // 'loading' | 'success' | 'error'
    data: null,
    error: null,
  });

  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const isMounted = useRef(false);
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => {
    setState({ status: 'loading', data: null, error: null });
    setAttempt((n) => n + 1);
  }, []);

  useEffect(() => {
    isMounted.current = true;
    let cancelled = false;

    fetcherRef
      .current()
      .then((data) => {
        if (cancelled || !isMounted.current) return;
        setState({ status: 'success', data, error: null });
      })
      .catch((error) => {
        if (cancelled || !isMounted.current) return;
        setState({ status: 'error', data: null, error });
      });

    return () => {
      cancelled = true;
      isMounted.current = false;
    };
  }, [attempt]);

  return {
    ...state,
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',
    retry,
  };
}

export default useContent;
