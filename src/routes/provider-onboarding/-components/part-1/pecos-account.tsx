import Input from '@/components/ui/input';
import Radios from '@/components/ui/radios';
import { YES_NO } from '@/lib/constants';
import type { ProviderOnboardingFormData } from '@/types';
import { useFormContext } from 'react-hook-form';

const HiddenSection = ({ value }: { value: string }) => (
  <div className='space-y-4'>
    {value === 'Yes' ? (
      <>
        <p className='mb-2 max-w-[40ch] font-medium'>
          <small>
            By providing my log in credentials here, I authorize Orenda to
            access my account on my behalf
          </small>
        </p>
        <Input label='PECOS Username' name='PECOS_username' />
        <Input label='PECOS Password' name='PECOS_password' type='password' />
      </>
    ) : (
      <>
        <p className='mb-2 max-w-[40ch] font-medium'>
          <small>
            By initialling here, I authorize Orenda to create an account on my
            behalf
          </small>
        </p>
        <Input
          label='Please provide your NPPES Username (to create your login details for PECOS)'
          name='NPPES_username'
        />
        <Input label='NPPES Password' name='PECOS_password' type='password' />
      </>
    )}
  </div>
);

const PecosAccount = () => {
  const { watch } = useFormContext<ProviderOnboardingFormData>();
  const value = watch('consent_create_pecos_account') as 'Yes' | 'No';

  return (
    <fieldset className='fieldset'>
      <Radios
        label='Do you have a PECOS Account?'
        name='consent_create_pecos_account'
        className='sm:grid-cols-1'
        options={[
          ...YES_NO,
          {
            value:
              ' I do not authorize Orenda to access or create a PECOS account on my behalf',
          },
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
