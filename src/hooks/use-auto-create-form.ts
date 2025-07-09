import axios from '@/lib/api/axios';
import type { PENDING_FORM_EPS } from '@/lib/api/endpoints';
import { FORM_IDS } from '@/lib/constants';
import { convertToFormData, getLSItem, setLSItem } from '@/lib/utils';
import type { CreditCardFormData, IntakeFormData } from '@/types';
import { AxiosError } from 'axios';
import { useEffect, useState, useRef } from 'react';

interface UseAutoCreateFormProps {
  formID: (typeof FORM_IDS)[keyof typeof FORM_IDS];
  isPendingForm: boolean;
  data: Partial<IntakeFormData | CreditCardFormData>;
  url: (typeof PENDING_FORM_EPS)[keyof typeof PENDING_FORM_EPS];
}

const useAutoCreateForm = ({
  formID,
  isPendingForm,
  data,
  url,
}: UseAutoCreateFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formId, setFormId] = useState(() => getLSItem(formID));
  const [error, setError] = useState(null);

  // Prevent multiple simultaneous calls
  const isCreatingRef = useRef(false);

  useEffect(() => {
    const createPendingPatient = async () => {
      // Exit early if conditions aren't met
      if (!isPendingForm || formId || isCreatingRef.current) {
        return;
      }

      try {
        isCreatingRef.current = true;
        setIsLoading(true);
        setIsError(false);
        setError(null);

        const _data = convertToFormData(data);

        const res = await axios.post(url, _data);

        if (res.data.success) {
          setLSItem(formID, res.data.id);
          setFormId(res.data.id);
        }
      } catch (err) {
        setIsError(true);
        setError(
          err instanceof AxiosError
            ? err?.response?.data
            : err instanceof Error
              ? err.message
              : 'Something went wrong',
        );
        console.error('Failed to create pending patient', err);
      } finally {
        setIsLoading(false);
        isCreatingRef.current = false;
      }
    };

    createPendingPatient();
  }, [isPendingForm, formId]);

  return { isLoading, isError, error, formId };
};

export default useAutoCreateForm;
