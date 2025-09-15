import { useFormContext, useFormState, useWatch } from 'react-hook-form';
import Button from './custom-button';
import { checkErrors } from '@/lib/utils';
import { useEffect } from 'react';

const SubmitButton = () => {
  const { errors, isSubmitting } = useFormState();
  const { getValues } = useFormContext();
  const policy = getValues('policy_agreement');
  const policy_agreement =
    useWatch({ name: 'policy_agreement', exact: true }) ?? policy;



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
