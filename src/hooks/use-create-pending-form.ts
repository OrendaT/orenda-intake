import axios from '@/lib/api/axios';
import type { PENDING_FORM_EPS } from '@/lib/api/endpoints';
import { FORM_IDS } from '@/lib/constants';
import { convertToFormData, getLSItem, setLSItem } from '@/lib/utils';
import type { FormData } from '@/types';
import { isAxiosError } from 'axios';
import { useEffect, useState, useRef } from 'react';

interface UseCreatePendingFormProps {
  formID: (typeof FORM_IDS)[keyof typeof FORM_IDS];
  isPendingForm: boolean;
  data: Partial<FormData>;
  url: (typeof PENDING_FORM_EPS)[keyof typeof PENDING_FORM_EPS];
}

const useCreatePendingForm = ({
  formID,
  isPendingForm,
  data,
  url,
}: UseCreatePendingFormProps) => {
  const [state, setState] = useState({
    isLoading: false,
    isError: false,
    error: null,
    formId: getLSItem(formID),
  });
  const isCreatingRef = useRef(false);

  useEffect(() => {
    const isMounted = true;

    const createPendingForm = async () => {
      if (!isPendingForm || state.formId || isCreatingRef.current || !isMounted)
        return;

      isCreatingRef.current = true;
      setState((prev) => ({
        ...prev,
        isLoading: true,
        isError: false,
        error: null,
      }));

      try {
        const _data = convertToFormData(data);
        const res = await axios.post(url, _data);

        if (res.data.success && isMounted) {
          setLSItem(formID, res.data.id);
          setState((prev) => ({ ...prev, formId: res.data.id }));
        }
      } catch (err) {
        const errorMsg = isAxiosError(err)
          ? err.response?.data
          : err instanceof Error
            ? err.message
            : 'Something went wrong';

        if (isMounted)
          setState((prev) => ({ ...prev, isError: true, error: errorMsg }));
      } finally {
        if (isMounted) {
          setState((prev) => ({ ...prev, isLoading: false }));
          isCreatingRef.current = false;
        }
      }
    };

    createPendingForm();
  }, [isPendingForm, state.formId, data, url, formID]);

  return state;
};

export default useCreatePendingForm;
