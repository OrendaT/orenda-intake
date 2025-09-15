import Input from '@/components/ui/input';
import Radios from '@/components/ui/radios';
import type { OnboardingFormData } from '@/types';
import { useWatch } from 'react-hook-form';

const hearAboutOptions = [
  { value: 'Job Board (e.g., Indeed, LinkedIn)' },
  { value: 'Orenda Website' },
  { value: 'Social Media' },
  { value: 'Google Search' },
  { value: 'School/University Career Fair' },
  { value: 'Employee Referral' },
  { value: 'I did a clinical rotation with Orenda during my PMHNP program' },
  { value: 'Others' },
];

const HearAbout = () => {
  const value = useWatch<OnboardingFormData>({
    name: 'referral_source',
    exact: true
  });
  const isOthers = value === 'Others';

  return (
    <fieldset className='fieldset'>
      <Radios
        label='How did you hear about Orenda?'
        name='referral_source'
        options={hearAboutOptions}
        required={false}
        showHiddenSectionValue={['Others', 'Employee Referral']}
        hiddenSection={
          <Input
            label={
              isOthers
                ? 'Please specify'
                : 'Please specify referring providers name'
            }
            name={'referral_source_detail'}
            size='small'
          />
        }
      />
    </fieldset>
  );
};
export default HearAbout;
