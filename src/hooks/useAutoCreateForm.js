import axios from '@/lib/axios';
import {
  convertToFormData,
  getLSItem,
  isValidEmail,
  setLSItem,
} from '@/lib/utils';
import { useEffect, useState } from 'react';

const useAutoCreateForm = ({ first_name, last_name, email, phone }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const createPendingPatient = async () => {
        const form_id = getLSItem('form_id');

        const isPending =
          first_name.length > 1 &&
          last_name.length > 1 &&
          isValidEmail(email) &&
          phone.length > 7;

        if (isPending && !form_id) {
          try {
            setIsLoading(true);
            const data = convertToFormData({
              first_name,
              last_name,
              email,
            });
            const res = await axios.post('patients/pending-patient', data);

            if (res.data.success) {
              setLSItem('form_id', res.data.id);
            }
          } catch (err) {
            setIsError(true);
            setError(err.response.data);
            console.error('Failed to create pending patient', err);
          } finally {
            setIsLoading(false);
          }
        }
      };

      createPendingPatient();
    }, 500);

    return () => clearTimeout(timeout);
  }, [first_name, last_name, email, phone]);

  return { isLoading, isError, error };
};

export default useAutoCreateForm;
