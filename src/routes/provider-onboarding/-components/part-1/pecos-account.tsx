import Input from '@/components/ui/input';
import Radios from '@/components/ui/radios';
import { YES_NO } from '@/lib/constants';
import type { OnboardingFormData } from '@/types';
import { useWatch } from 'react-hook-form';

const HiddenSection = ({ value }: { value: string }) => (
  <div className='space-y-3'>
    {value === YES_NO[0].value ? (
      <>
        <p className='mb-2 font-medium'>
          <small>
            By providing my log in credentials here, I authorize Orenda to
            access my account on my behalf
          </small>
        </p>
        <Input label='PECOS Username' name='PECOS_username' size='small' />
        <Input
          label='PECOS Password'
          name='PECOS_password'
          type='password'
          size='small'
        />
      </>
    ) : (
      <>
        <Input
          label='Please provide your NPPES Username'
          name='NPPES_username'
          size='small'
          helperText='To create your login details for PECOS'
        />
        <Input
          label='NPPES Password'
          name='PECOS_password'
          type='password'
          size='small'
        />
      </>
    )}
  </div>
);

const PecosAccount = () => {
  const value = useWatch<OnboardingFormData>({
    name: 'consent_create_pecos_account',
    exact: true
  }) as string;

  return (
    <fieldset className='fieldset'>
      <Radios
        label='Do you have a PECOS Account?'
        name='consent_create_pecos_account'
        className='sm:grid-cols-1'
        options={[
          { value: 'Yes' },
          { value: 'No, I authorize Orenda to create an account on my behalf' },
        ]}
        showHiddenSectionValue={[0, 1]}
        hiddenSection={<HiddenSection value={value} />}
      />

      <p>
        <strong>NB:</strong> PTAN/Medicare ID (If you do not have a
        PTAN/Medicare ID or do not know your Medicare ID, please enter "N/A.")
      </p>

      <Input name='PTAN_medicare_ID' label='Response' className='!-mt-3' />
    </fieldset>
  );
};
export default PecosAccount;
