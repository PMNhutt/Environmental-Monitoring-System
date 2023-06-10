import { useState, useEffect } from 'react';

function useDebounce(value: number, delay: number) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounceValue(value), delay);

    return () => clearTimeout(handler);
  }, [value]);

  return debounceValue;
}

export default useDebounce;