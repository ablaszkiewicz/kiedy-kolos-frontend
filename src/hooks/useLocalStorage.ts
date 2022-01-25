import { useState, useEffect } from 'react';

export default function useLocalStorage(key: any, defaultValue: any) {
  const [value, setValue] = useState(() => {
    const item: any = localStorage.getItem(key);
    const parsedItem = JSON.parse(item);

    return parsedItem || defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
