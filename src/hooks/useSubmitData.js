import { convertToFormData } from '@/lib/utils';
import axios from '@/lib/axios';
import { useState } from 'react';
import { toast } from 'sonner';

const useSubmitData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const submitData = async (data) => {
    let response;
    const formData = convertToFormData(data);

    try {
      setIsLoading(true);
      response = await axios.post('patients', formData);
      toast.success('Form submission successful!');
      setError(null);
    } catch (error) {
      setIsError(true);
      setError(error.response.data);
      setTimeout(() => {
        setIsError(false);
        setError(null);
      }, 3000);
      console.error(error);
    } finally {
      setIsLoading(false);
    }

    return response.data || response;
  };

  return { isLoading, isError, error, submitData };
};
export default useSubmitData;
