import axios from '@/lib/axios';
import { FORM_ID } from '@/lib/constants';
import {
  convertToFormData,
  getLSItem,
  isValidEmail,
  setLSItem,
} from '@/lib/utils';
import { useEffect, useState, useRef } from 'react';

const useAutoCreateForm = ({ first_name, last_name, email, phone }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formId, setFormId] = useState(() => getLSItem('form_id'));
  const [error, setError] = useState(null);

  // Prevent multiple simultaneous calls
  const isCreatingRef = useRef(false);

  useEffect(() => {
    const createPendingPatient = async () => {
      const isPending =
        first_name.length > 1 &&
        last_name.length > 1 &&
        isValidEmail(email) &&
        phone.length > 7;

      // Exit early if conditions aren't met
      if (!isPending || formId || isCreatingRef.current) {
        return;
      }

      try {
        isCreatingRef.current = true;
        setIsLoading(true);
        setIsError(false);
        setError(null);

        const data = convertToFormData({
          first_name,
          last_name,
          email,
        });

        const res = await axios.post('patients/pending-patient', data);

        if (res.data.success) {
          setLSItem(FORM_ID, res.data.id);
          setFormId(res.data.id);
        }
      } catch (err) {
        setIsError(true);
        setError(err?.response?.data || 'Something went wrong');
        console.error('Failed to create pending patient', err);
      } finally {
        setIsLoading(false);
        isCreatingRef.current = false;
      }
    };

    createPendingPatient();
  }, [first_name, last_name, email, phone, formId]);

  return { isLoading, isError, error, formId };
};

export default useAutoCreateForm;
