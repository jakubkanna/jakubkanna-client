import { useState, useEffect } from "react";
import { resolveStaticData } from "../utils/staticData";

export const useFetchData = <T,>(path: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      setError(null);

      try {
        const result = resolveStaticData(path);
        if (result === null || result === undefined) {
          throw new Error(`No static data found for path "${path}".`);
        }
        setData(result as T);
      } catch (err) {
        setError(
          (err as Error).message || "An error occurred while fetching data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [path]);

  return { data, loading, error };
};
