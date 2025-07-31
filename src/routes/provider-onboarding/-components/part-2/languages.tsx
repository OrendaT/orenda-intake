import HiddenSection from '@/components/hidden-section';
import Input from '@/components/ui/input';
import Radios from '@/components/ui/radios';
import Select from '@/components/ui/select';
import { YES_NO } from '@/lib/constants';
import type { ProviderOnboardingFormData } from '@/types';
import { useFormContext } from 'react-hook-form';

const languages = [
  { value: 'Russian' },
  { value: 'Bengali' },
  { value: 'Cantonese' },
  { value: 'Mandarin' },
  { value: 'Uzbek' },
  { value: 'Tagalog' },
  { value: 'Spanish' },
  { value: 'Yoruba' },
  { value: 'French (Creole)' },
  { value: 'Portuguese' },
  { value: 'None' },
  { value: 'Others' },
];

const Languages = () => {
  const { watch } = useFormContext<ProviderOnboardingFormData>();
  const hasOthers = watch('languages')?.includes('Others');

  return (
    <fieldset className='fieldset'>
      <Radios
        label='Do you speak other languages other than English?'
        name='other_languages'
        options={YES_NO}
        showHiddenSectionValue={0}
        hiddenSection={
          <div className='space-y-4'>
            <Select
              containerClassName='clamp-[max-w,15rem,lg]'
              label='Please select'
              name='languages'
              options={languages}
              multiple
            />
            <HiddenSection show={hasOthers}>
              <Input label='Others? Please specify' name='languages_others' />
            </HiddenSection>
          </div>
        }
      />
    </fieldset>
  );
};
export default Languages;
