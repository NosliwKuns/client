import { useState, useEffect } from "react";

const getStorageValue = (key : any, defaultValue : any) => {
  // getting stored value
  if (typeof window !== 'undefined')  {
    const saved : any = localStorage.getItem(key);
    const initial = JSON.parse(saved);
    return initial || defaultValue;
  }
};

const useLocalStorage = (key : any, defaultValue : any) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
export default useLocalStorage;