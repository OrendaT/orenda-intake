import useAutoSave from '@/hooks/use-auto-save';
import useCreatePendingForm from '@/hooks/use-create-pending-form';
import { checkFormData, sanitizeState } from '@/lib/utils';
import type { FormData } from '@/types';
import { useWatch } from 'react-hook-form';

type PersistFormValueProps = Omit<
  Parameters<typeof useCreatePendingForm>[0],
  'isPendingForm' | 'data'
> & {
  saveKey: Parameters<typeof useAutoSave>[0]['key'];
  formID: Parameters<typeof useCreatePendingForm>[0]['formID'];
  fields: Parameters<typeof checkFormData>[1];
  keysToRemove?: string[];
};

const PersistFormValues = ({
  saveKey,
  formID,
  url,
  fields,
  keysToRemove,
}: PersistFormValueProps) => {
  const formState = useWatch<FormData>({exact: true}) as FormData;

  const sanitizedState = sanitizeState(formState, keysToRemove);

  useAutoSave({ key: saveKey, value: sanitizedState });

  const { isPendingForm, data } = checkFormData(formState, fields);

  useCreatePendingForm({
    formID,
    isPendingForm,
    data,
    url,
  });

  return null;
};
export default PersistFormValues;
