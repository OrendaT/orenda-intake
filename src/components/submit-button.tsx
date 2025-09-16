import { useFormContext, useFormState, useWatch } from 'react-hook-form';
import { checkErrors } from '@/lib/utils';
import Button from './ui/custom-button';

const SubmitButton = () => {
  const { errors, isSubmitting } = useFormState();
  const { getValues } = useFormContext();

  // Only try to get/watch if the field exists
  const hasPolicyAgreement = 'policy_agreement' in getValues();
  const policy_agreement = hasPolicyAgreement
    ? (useWatch({ name: 'policy_agreement', exact: true }) ??
      getValues('policy_agreement'))
    : true; // default to true if field not present

  return (
    <Button
      disabled={!Boolean(policy_agreement)}
      isLoading={isSubmitting}
      onClick={() => checkErrors(errors)}
      type='submit'
      className='mx-auto mt-12'
    >
      {isSubmitting ? 'Submitting' : 'Submit Form'}
    </Button>
  );
};

export default SubmitButton;
