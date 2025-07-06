import { INTAKE_FORM } from "@/lib/constants";
import { setItem } from "@/lib/utils";
import { deepEqual } from "fast-equals";
import { useEffect, useRef } from "react";

interface UseAutoSaveProps {
  key?: string;
  value: any;
  delay?: number;
}

/**
 * Custom hook for automatically saving data to storage with debounce
 */
const useAutoSave = ({
  key = INTAKE_FORM,
  value,
  delay = 500,
}: UseAutoSaveProps) => {
  const previousValueRef = useRef(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Skip saving if values are deeply equal
    if (deepEqual(value, previousValueRef.current)) {
      return;
    }

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for debounced save
    timeoutRef.current = setTimeout(() => {
      try {
        setItem(key, value);
        previousValueRef.current = value;
      } catch (error) {
        console.error("Error saving data:", error);
      }
    }, delay);

    // Cleanup on unmount or before next effect run
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [key, value, delay]);
};

export default useAutoSave;
