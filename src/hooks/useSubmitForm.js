import { convertToFormData, getLSItem, removeLSItem } from '@/lib/utils';
import axios from '@/lib/axios';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

const useSubmitForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const submitForm = useCallback(
    async (data) => {
      if (isLoading || isSuccess) return;

      let response;

      const id = getLSItem('form_id');
      const submitData = { ...data, id };
      const formData = convertToFormData(submitData);

      try {
        setIsLoading(true);
        setIsError(false); // Reset error state
        setError(null);

        response = await axios.post('patients', formData);

        removeLSItem('form_id');
        setIsSuccess(true);
      } catch (error) {
        console.error('Form submission error:', error);

        const errorMessage =
          error.response?.data?.message || 'Something went wrong';
        toast.error(errorMessage);

        setIsError(true);
        setError(errorMessage);

        // Auto-clear error after 3 seconds
        setTimeout(() => {
          setIsError(false);
          setError(null);
        }, 3000);
      } finally {
        setIsLoading(false);
      }

      return response;
    },
    [],
  );


  return {
    isLoading,
    isError,
    isSuccess,
    error,
    submitForm,
  };
};

export default useSubmitForm;
