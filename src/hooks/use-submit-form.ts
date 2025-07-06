import axios from "@/lib/axios";
import { FORM_ID } from "@/lib/constants";
import { convertToFormData, getLSItem } from "@/lib/utils";
import type { IntakeFormData } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

const useSubmitForm = () => {
  const submitForm = async (data: IntakeFormData) => {
    const id = getLSItem(FORM_ID);
    const submitData = { ...data, id };
    const formData = convertToFormData(submitData);

    const res = await axios.post<{ success: boolean }>("patients", formData);

    return res;
  };

  return useMutation({
    mutationFn: submitForm,
    onError: (error) => {
      console.error("Form submission error:", error);
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message
          : "Something went wrong";
      toast.error(errorMessage);
    },
  });
};

export default useSubmitForm;
