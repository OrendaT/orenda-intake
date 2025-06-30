import { FormProvider, useForm } from 'react-hook-form';
import Button from '@/components/ui/custom-button';
import { useState } from 'react';
import { getItem, parseFormData, removeItem, removeLSItem } from '@/lib/utils';
import { FORM_ID, INTAKE_FORM } from '@/lib/constants';
import useAutoSave from '@/hooks/useAutoSave';
import useSubmitForm from '@/hooks/useSubmitForm';
import { initialValues } from '@/lib/definitions';
import {
  PersonalInfo,
  AddressDetails,
  MentalHealth,
  InsuranceDetails,
  CreditCardDetails,
  PolicyDialog,
} from '@/components';
import SignaturePad from '@/components/ui/signature';
import ResponsiveTooltip from '@/components/responsive-tooltip';
import useAutoCreateForm from '@/hooks/useAutoCreateForm';
import useSignature from '@/hooks/useSignature';
import SuccessModal from '@/components/home/success-modal';

const Home = () => {
  const defaultValues = getItem(INTAKE_FORM) ?? initialValues;
  const methods = useForm({ defaultValues });
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = methods;
  const { isLoading, isSuccess, submitForm } = useSubmitForm();
  const { setSignature } = useSignature();

  // Watch the policy agreement checkbox
  const acceptedTerms =
    watch('policy_agreement')?.[0] === 'I agree' ||
    watch('policy_agreement') === 'I agree';

  const [openTerms, setOpenTerms] = useState(false);

  const onSubmit = async (data) => {
    if (data.relationship_status_other) {
      data.relationship_status = data.relationship_status_other;
      data.relationship_status_other = undefined;
    }

    data = parseFormData(data);

    console.log(data);

    const response = await submitForm(data);

    console.log(response);

    if (response.data.success) {
      removeItem(INTAKE_FORM);
      reset(initialValues);
      removeLSItem(FORM_ID);
      setSignature({ text: '', base64: '' });
    }
  };

  const formState = watch();
  const sanitizedState = {
    ...formState,
    policy_agreement: undefined,
  };

  useAutoSave({ value: sanitizedState });

  const { first_name, last_name, email, phone } = formState;
  useAutoCreateForm({ first_name, last_name, email, phone });

  return (
    <>
      <main className='padding-inline bg-dotted-purple py-16 ~text-sm/base'>
        <div className='mx-auto max-w-[59.4rem]'>
          <h1 className='mb-4 text-center font-heading font-bold ~text-3xl/[2.625rem]'>
            Orenda Intake Form
          </h1>
          <p className='mx-auto max-w-3xl text-center font-semibold'>
            Please complete this form so your appointment may be scheduled
            <br />
            <em>
              (Your appointment will be confirmed following the completion of
              this form)
            </em>
          </p>
          <br />
          <p className='mx-auto max-w-3xl text-center'>
            <em>
              If you or someone you know is struggling or in crisis, call the
              National Suicide Prevention Hotline at{' '}
              <a href='tel:18002738255'>1-800-273-8255</a> or{' '}
              <a href='tel:911'>911</a>. Immediate help is available.
            </em>
          </p>

          <section className='mt-10 ~text-sm/base'>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Form content */}
                <div className='space-y-8'>
                  <fieldset className='fieldset'>
                    <PersonalInfo />
                    <fieldset className='fieldset'>
                      <h2 className='legend'>Address</h2>
                      <AddressDetails />
                    </fieldset>

                    <MentalHealth />
                  </fieldset>
                  <fieldset className='fieldset'>
                    <h2 className='legend'>Insurance & Payment Info</h2>
                    <InsuranceDetails />
                    <CreditCardDetails />
                  </fieldset>
                </div>

                {/* Terms and Conditions Agreement */}
                <fieldset className='mx-auto max-w-[46.125rem] rounded border-l-[5px] border-zinc-500 bg-transparent pb-0 ~px-5/12 ~pt-3/6'>
                  <label className='flex w-full items-center gap-3 ~text-sm/[0.93rem]'>
                    <input
                      className='size-4 flex-shrink-0'
                      type='checkbox'
                      value='I agree'
                      {...register('policy_agreement', {
                        required: 'This field is required',
                      })}
                    />

                    <div>
                      <span>
                        By clicking on the checkbox and signing below, I confirm
                        that I have read and agreed to Orenda&apos;s{' '}
                        <PolicyDialog
                          open={openTerms}
                          onOpenChange={setOpenTerms}
                        >
                          <button
                            type='button'
                            className='font-medium text-orenda-purple'
                          >
                            <span className='underline underline-offset-2'>
                              Terms of Use and Practice Policy
                            </span>
                          </button>
                        </PolicyDialog>
                      </span>

                      <span className='inline-flex'>
                        <ResponsiveTooltip
                          content={
                            <ul>
                              <li>Consent for Telehealth Consultation</li>
                              <li>Notice of Privacy Policies</li>
                              <li>Practice Policies</li>
                              <li>
                                Informed Consent for Psychiatric Treatment{' '}
                              </li>
                              <li>Consent for Medication History</li>
                            </ul>
                          }
                        />
                      </span>
                    </div>
                  </label>

                  <SignaturePad
                    name='policy_agreement_signature'
                    className='mt-5'
                  />
                </fieldset>

                {/* Form submit button */}
                <Button
                  disabled={!acceptedTerms}
                  isLoading={isLoading}
                  type='submit'
                  className='mx-auto mt-12'
                >
                  {isLoading ? 'Submitting' : 'Submit Form'}
                </Button>

                {!!Object.entries(errors)?.length && (
                  <p className='error !mt-4 text-center !text-sm font-semibold'>
                    Please ensure all required fields are filled out.
                  </p>
                )}
              </form>
            </FormProvider>
          </section>
        </div>
      </main>

      {isSuccess && <SuccessModal open={isSuccess} />}
    </>
  );
};

export default Home;
