import { convertToFormData, getLSItem, removeLSItem } from '@/lib/utils';
import axios from '@/lib/axios';
import { useState } from 'react';

const useSubmitForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
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

  return { isLoading, isError, error, submitForm };
};
export default useSubmitForm;
