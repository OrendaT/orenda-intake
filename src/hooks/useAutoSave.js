import { STORAGE_KEY } from '@/lib/constants';
import { setItem } from '@/lib/utils';
import { deepEqual } from 'fast-equals';
import { useEffect, useRef } from 'react';

const useAutoSave = ({ key = STORAGE_KEY, value, delay = 1000 }) => {
  const previousValue = useRef(value);

  useEffect(() => {
    if (deepEqual(value, previousValue.current)) return;

    const timeOutId = setTimeout(() => {
      setItem(key, value);
      previousValue.current = value;
    }, delay);

    return () => clearTimeout(timeOutId);
  }, [key, value, delay]);
};

export default useAutoSave;
