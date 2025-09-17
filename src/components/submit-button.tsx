import { useFormContext, useFormState, useWatch } from 'react-hook-form';
import { checkErrors } from '@/lib/utils';
import Button from './ui/custom-button';

const SubmitButton = ({ hasPolicy = true }: { hasPolicy?: boolean }) => {
  const { errors, isSubmitting } = useFormState();
  const { getValues } = useFormContext();

  const policy = getValues('policy_agreement');
  const _policy = useWatch({ name: 'policy_agreement', exact: true });
  const acceptedTerms = hasPolicy ? Boolean(policy || _policy) : true;

  return (
    <Button
      disabled={!acceptedTerms}
      isLoading={isSubmitting}
      onClick={() => checkErrors(errors)}
      type='submit'
      className='mx-auto mt-12'
    >
      {isSubmitting ? 'Submitting' : 'Submit Form'}{' '}
    </Button>
  );
};
export default SubmitButton;
