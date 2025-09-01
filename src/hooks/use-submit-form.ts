import axios from '@/lib/api/axios';
import type { FORM_EPS } from '@/lib/api/endpoints';
import { FORM_IDS } from '@/lib/constants';
import { convertToFormData, getLSItem } from '@/lib/utils';
import type { FormData } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

interface useSubmitFormProps {
  form: keyof typeof FORM_IDS;
  url: (typeof FORM_EPS)[keyof typeof FORM_EPS];
}

const useSubmitForm = ({ form, url }: useSubmitFormProps) => {
  const submitForm = async (data: FormData) => {
    const id = getLSItem(FORM_IDS[form]);
    const submitData = { ...data, id };
    const formData = convertToFormData(submitData);

    const res = await axios.post<{ success: boolean }>(url, formData);

    return res;
  };

  return useMutation({
    mutationFn: submitForm,
    onError: (error) => {
      console.error('Form submission error:', error);
      let message = 'Something went wrong';

      if (isAxiosError(error)) {
        const data = error.response?.data;
        message = data?.message || data.errors.split(',') || error.message;
      }
      toast.error(message);
    },
  });
};

export default useSubmitForm;
