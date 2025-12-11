/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";

export function useDebouncedSearch<T, D>(
  query: T,
  searchFn: (q: T, signal: AbortSignal) => D,
  delay = 400,
) {
  const [data, setData] = useState<D | null>(null);
  const [loading, setLoading] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<any>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      if (abortRef.current) abortRef.current.abort();

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        setLoading(true);
        const res = await searchFn(query, controller.signal);

        setData(res.data);
      } catch (err) {
        if (err.name !== "CanceledError") console.error(err);
      } finally {
        setLoading(false);
      }
    }, delay);

    return () => clearTimeout(debounceRef.current);
  }, [JSON.stringify(query)]);

  return { data, loading };
}
