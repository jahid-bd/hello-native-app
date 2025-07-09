// fetchMovies
// fetchMovieDetails
// useFetch(fetchMovies)

import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const result = await fetchFunction();

      setData(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("An Error Occured"));
      }
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return {
    data,
    error,
    loading,
    refetch: fetchData,
    reset,
  };
};

export default useFetch;
