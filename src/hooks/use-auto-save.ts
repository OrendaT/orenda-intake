import { INTAKE_FORM } from '@/lib/constants';
import { setItem } from '@/lib/utils';
import { deepEqual } from 'fast-equals';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { useDebouncedCallback } from 'use-debounce';

interface UseAutoSaveProps {
  key?: string;
  value: unknown;
  delay?: number;
}

/**
 * Custom hook for automatically saving data to storage with debounce
 */
const useAutoSave = ({
  key = INTAKE_FORM,
  value,
  delay = 1000,
}: UseAutoSaveProps) => {
  const previousValueRef = useRef(value);

  const debouncedSave = useDebouncedCallback(() => {
    try {
      setItem(key, value);
    } catch (error) {
      console.error('Error saving to storage:', error);
      toast.error('Error during auto save');
    }

    previousValueRef.current = value;
  }, delay);

  useEffect(() => {
    // Skip saving if values are deeply equal
    if (deepEqual(value, previousValueRef.current)) {
      return;
    }

    debouncedSave();

    return () => debouncedSave.cancel?.();
  }, [value, debouncedSave]);
};

export default useAutoSave;
