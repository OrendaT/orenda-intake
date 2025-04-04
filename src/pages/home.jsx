import { FormProvider, useForm } from 'react-hook-form';
import PatientsDetails from '../components/home/patients-details';
import InsuranceAndPayment from '../components/home/insurance_and_payment';
import Button from '@/components/ui/custom-button';
import PolicyDialog from '@/components/policy';
import { sendToMail } from '../services/email';
import { useState } from 'react';
import { getItem, removeItem } from '@/lib/utils';
import { STORAGE_KEY } from '@/lib/constants';
import useAutoSave from '@/hooks/useAutoSave';

const Home = () => {
  const defaultValues = getItem(STORAGE_KEY);
  const methods = useForm({ defaultValues });
  const { handleSubmit, register, watch } = methods;

  // Watch the terms and conditions checkbox
  const acceptedTerms = watch('terms_and_conditions');

  const [openTerms, setOpenTerms] = useState(false);
  const [termsOpened, setTermsOpened] = useState(false);

  const handleTermsOpened = () => {
    if (!termsOpened) {
      setTermsOpened(true);
      setOpenTerms(true);
    }
  };

  const onSubmit = async (data) => {
    sendToMail(data);
    removeItem(STORAGE_KEY);
  };

  useAutoSave({ value: watch() });

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
              <div className='space-y-8'>
                <PatientsDetails />
                <InsuranceAndPayment />
              </div>

              <label
                onClick={handleTermsOpened}
                className='mx-auto flex w-full max-w-2xl items-center gap-4 ~text-sm/base'
              >
                <input
                  className='flex-shrink-0 ~size-4/5'
                  type='checkbox'
                  value='agreed-to-terms'
                  {...register('terms_and_conditions', {
                    required: 'This field is required',
                  })}
                />
                <div>
                  <span>
                    I confirm that I have read and agreed to Orenda&apos;s{' '}
                    <PolicyDialog open={openTerms} onOpenChange={setOpenTerms}>
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

              <Button
                disabled={!acceptedTerms}
                type='submit'
                className='mx-auto mt-12'
              >
                Submit Form
              </Button>
            </form>
          </FormProvider>
        </section>
      </div>
    </main>
  );
};

export default Home;
