import { FormProvider, useForm } from 'react-hook-form';
import Button from '@/components/ui/custom-button';
import { useState } from 'react';
import { getItem, parseFormData, removeItem } from '@/lib/utils';
import { STORAGE_KEY } from '@/lib/constants';
import useAutoSave from '@/hooks/useAutoSave';
import useSubmitData from '@/hooks/useSubmitData';
import { initialValues } from '@/lib/definitions';
import {
  PersonalInfo,
  AddressDetails,
  MentalHealth,
  InsuranceDetails,
  CreditCardDetails,
  PolicyDialog,
} from '@/components';

const Home = () => {
  const defaultValues = getItem(STORAGE_KEY) ?? initialValues;
  const methods = useForm({ defaultValues });
  const { handleSubmit, register, reset, watch } = methods;
  const { isLoading, submitData } = useSubmitData();

  // Watch the policy agreement checkbox
  const acceptedTerms =
    watch('policy_agreement')?.[0] === 'I agree' ||
    watch('policy_agreement') === 'I agree';

  const [openTerms, setOpenTerms] = useState(false);
  const [termsOpened, setTermsOpened] = useState(false);

  const handleTermsOpened = () => {
    if (!termsOpened) {
      setTermsOpened(true);
      setOpenTerms(true);
    }
  };

  const onSubmit = async (data) => {
    data = parseFormData(data);

    console.log(data);

    const response = await submitData(data);

    if (response.success) {
      removeItem(STORAGE_KEY);
      reset(initialValues);
      setTermsOpened(false);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  };
  const formState = watch();
  const sanitizedState = { ...formState, policy_agreement: undefined };
  useAutoSave({ value: sanitizedState });

  return (
    <main className='padding-inline bg-dotted-purple py-16'>
      <div className='mx-auto max-w-[59.4rem]'>
        <h1 className='mb-4 text-center font-heading font-bold ~text-3xl/[2.625rem]'>
          Orenda Intake Form
        </h1>
        <p className='text-center font-semibold ~text-sm/base'>
          Please fill this out with current information towards your appointment
        </p>

        <section className='mt-10 ~text-sm/base'>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Form content */}
              <div className='space-y-8'>
                <fieldset className='fieldset'>
                  <PersonalInfo />
                  <AddressDetails />
                  <MentalHealth />
                </fieldset>
                <fieldset className='fieldset ~text-sm/base'>
                  <h2 className='legend'>Insurance & Payment Info</h2>
                  <InsuranceDetails />
                  <CreditCardDetails />
                </fieldset>
              </div>

              {/* Agreement Checkbox */}
              <div className='sm:ps-8'>
                <label
                  onClick={handleTermsOpened}
                  className='mx-auto flex w-full max-w-2xl items-center gap-4 ~text-sm/base'
                >
                  <input
                    className='flex-shrink-0 ~size-4/5'
                    type='checkbox'
                    value='I agree'
                    {...register('policy_agreement', {
                      required: 'This field is required',
                    })}
                  />
                  <div>
                    <span>
                      I confirm that I have read and agreed to Orenda&apos;s{' '}
                      <PolicyDialog
                        open={openTerms}
                        onOpenChange={setOpenTerms}
                      >
                        <button
                          type='button'
                          className='font-medium text-orenda-purple underline underline-offset-2'
                        >
                          Terms of Use and Practice Policy
                        </button>
                      </PolicyDialog>
                    </span>
                    &nbsp;
                    <span className='text-orenda-purple'>*</span>
                  </div>
                </label>
              </div>
              {/* 
              <button
                className='fixed right-24 top-1/2'
                type='button'
                onClick={() =>
                  scrollTo({
                    left: 0,
                    top: 0,
                    behavior: 'smooth',
                  })
                }
              >
                Reset
              </button> */}

              {/* Form submit button */}
              <Button
                disabled={!acceptedTerms}
                isSubmitting={isLoading}
                type='submit'
                className='mx-auto mt-12'
              >
                {isLoading ? 'Submitting...' : 'Submit Form'}
              </Button>
            </form>
          </FormProvider>
        </section>
      </div>
    </main>
  );
};

export default Home;
