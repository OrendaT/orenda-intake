import { convertToFormData } from '@/lib/utils';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';

const url = import.meta.env.VITE_API_URL;

const useSubmitData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const submitData = async (data) => {
    let response;
    const formData = convertToFormData(data);

    try {
      setIsLoading(true);
      response = await axios.post(url, formData);
      toast('Form submission successful!');
    } catch (error) {
      setIsError(true);
      setError(error);
    } finally {
      setIsLoading(false);
    }

    return response.data;
  };

  return { isLoading, isError, error, submitData };
};
export default useSubmitData;
