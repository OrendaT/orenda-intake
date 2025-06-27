import { convertToFormData, getLSItem, removeLSItem } from '@/lib/utils';
import axios from '@/lib/axios';
import { useState } from 'react';
import { toast } from 'sonner';

const useSubmitForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  

  const submitForm = async (data) => {
    let response;
    const id = getLSItem('form_id');
    data.id = id;
    const formData = convertToFormData(data);

    try {
      setIsLoading(true);
      response = await axios.post('patients', formData);
      removeLSItem('form_id');
      setError(null);
      setIsSuccess(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
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

    return response;
  };

  return { isLoading, isError, isSuccess, error, submitForm };
};
export default useSubmitForm;
