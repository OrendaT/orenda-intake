import DatePicker from '@/components/ui/date-picker';
import FileInput from '@/components/ui/file-input';
import Input from '@/components/ui/input';
import Radios from '@/components/ui/radios';
import { YES_NO } from '@/lib/constants';
import type { ProviderOnboardingFormData as FormData } from '@/types';
import { useFormContext } from 'react-hook-form';

const MSNDNPCOI = () => {
  const { watch } = useFormContext<FormData>();
  const hnd = watch('highest_nursing_degree');

  return (
    <fieldset className='fieldset'>
      <Radios
        label='Do you have a MSN, a DNP, or both?'
        name='highest_nursing_degree'
        options={[...YES_NO, { value: 'Both' }]}
        showHiddenSectionValue={[0, 2]}
        hiddenSection={
          <>
            <p className='mb-2 text-sm font-medium'>
              Please include the following for your BSN and MSN or DNP:
            </p>

            {hnd === 'Both' && (
              <Input
                containerClassName='mb-3'
                label='Please indicate which one'
                name='highest_nursing_degree_other'
              />
            )}

            <div className='mb-3 flex w-full flex-col items-start gap-x-10 gap-y-3 *:w-full sm:flex-row'>
              <DatePicker label='Start Date' name='hnd_start_date' />

              <DatePicker label='End Date' name='hnd_end_date' />
            </div>

            <Input label='Name of School Attended' name='hnd_school' />
          </>
        }
      />

      <Radios
        label='Do you have COI coverage?'
        name='coi_coverage'
        options={YES_NO}
        showHiddenSectionValue={0}
        required={false}
        hiddenSection={
          <FileInput heading='Please upload' name='coi_coverage_doc' />
        }
      />
    </fieldset>
  );
};
export default MSNDNPCOI;
