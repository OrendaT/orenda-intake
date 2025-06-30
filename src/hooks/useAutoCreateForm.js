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
  const [formId, setFormId] = useState(() => getLSItem('form_id'));
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const timeout = setTimeout(() => {
      const createPendingPatient = async () => {
        const isPending =
          first_name.length > 1 &&
          last_name.length > 1 &&
          isValidEmail(email) &&
          phone.length > 7;

        if (isPending && !formId) {
          try {
            setIsLoading(true);
            const data = convertToFormData({
              first_name,
              last_name,
              email,
            });
            const res = await axios.post('patients/pending-patient', data);

            if (isMounted && res.data.success) {
              setLSItem('form_id', res.data.id);
              setFormId(res.data.id);
            }
          } catch (err) {
            if (isMounted) {
              setIsError(true);
              setError(err?.response?.data || 'Something went wrong');
              console.error('Failed to create pending patient', err);
            }
          } finally {
            if (isMounted) setIsLoading(false);
          }
        }
      };

      createPendingPatient();
    }, 500);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [first_name, last_name, email, phone, formId]);

  return { isLoading, isError, error };
};

export default useAutoCreateForm;
