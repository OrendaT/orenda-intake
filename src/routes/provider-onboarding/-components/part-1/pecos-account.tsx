import Input from '@/components/ui/input';
import Radios from '@/components/ui/radios';
import type { ProviderOnboardingFormData } from '@/types';
import { useFormContext } from 'react-hook-form';

const pecosAccountOptions = [
  { value: 'Yes, I already have a PECOS account' },
  { value: 'No, please create one on my behalf' },
];

const HiddenSection = ({
  value,
}: {
  value: (typeof pecosAccountOptions)[number]['value'];
}) => (
  <div className='space-y-4'>
    {value === 'Yes, I already have a PECOS account' ? (
      <>
        <Input label='PECOS Username' name='pecos_username' />
        <Input label='PECOS Password' name='pecos_password' type='password' />
      </>
    ) : (
      <>
        <Input
          label='Please provide your NPPES Username (to create your login details for PECOS)'
          name='nppes_username'
        />
        <Input label='NPPES Password' name='nppes_password' type='password' />
      </>
    )}
  </div>
);

const PecosAccount = () => {
  const { watch } = useFormContext<ProviderOnboardingFormData>();
  const value = watch(
    'pecos_consent',
  ) as (typeof pecosAccountOptions)[number]['value'];

  return (
    <fieldset className='fieldset'>
      <Radios
        label='Do you consent to us creating a PECOS account on your behalf if you don’t have a PTAN/Medicare ID or access to a PECOS login?'
        name='pecos_consent'
        options={pecosAccountOptions}
        className='sm:grid-cols-1'
        showHiddenSectionValue={[0, 1]}
        hiddenSection={<HiddenSection value={value} />}
      />

      <p>
        <strong>NB:</strong> PTAN/Medicare ID (If you do not have a
        PTAN/Medicare ID or do not know your Medicare ID, please enter "N/A.")
      </p>

      <Input name='ptan_response' label='Response' className='!-mt-3' />
    </fieldset>
  );
};
export default PecosAccount;
