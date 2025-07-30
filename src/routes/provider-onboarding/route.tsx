import { createFileRoute } from '@tanstack/react-router';

// Importing necessary components and hooks
import { FormProvider, useForm } from 'react-hook-form';
import Button from '@/components/ui/custom-button';
import { getItem, removeItem, removeLSItem } from '@/lib/utils';
import { FORM_IDS, FORMS } from '@/lib/constants';
import useAutoSave from '@/hooks/use-auto-save';
import useSubmitForm from '@/hooks/use-submit-form';
import useCreatePendingForm from '@/hooks/use-create-pending-form';
import useSignature from '@/hooks/use-signature';
import type { ProviderOnboardingFormData } from '@/types';
import { providerOnboardingInitialValues as initialValues } from '@/lib/definitions';

// Importing the component for Part 1 of the form
import Part1 from './-components/part-1';
import Part2 from './-components/part-2';
import SignaturePad from '@/components/ui/signature';
import ResponsiveTooltip from '@/components/responsive-tooltip';
import { PolicyDialog } from '@/components';

export const Route = createFileRoute('/provider-onboarding')({
  component: ProviderOnboardingForm,
  head: () => ({
    meta: [
      {
        title: 'Provider Onboarding Form | Orenda',
        description:
          'Complete the Orenda Provider Onboarding Form to join Orenda Psychiatry.',
      },
    ],
  }),
});

export function ProviderOnboardingForm() {
  const defaultValues = getItem(FORMS.provider_onboarding) || initialValues;
  const methods = useForm<ProviderOnboardingFormData>({
    defaultValues: defaultValues as ProviderOnboardingFormData,
  });
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = methods;
  const { mutateAsync: submitForm } = useSubmitForm({
    form: 'provider_onboarding',
    url: 'patients',
  });
  const { resetSignature } = useSignature();

  const onSubmit = handleSubmit(async (data) => {
    // Parse the form data to ensure it matches the expected structure

    const res = await submitForm(data);

    if (res?.data.success) {
      removeItem(FORMS.provider_onboarding);
      reset(initialValues);
      removeLSItem(FORM_IDS.provider_onboarding);
      resetSignature();
    }
  });

  const formState = watch();

  useAutoSave({ key: FORMS.provider_onboarding, value: formState });

  useCreatePendingForm({
    formID: 'provider_onboarding_id',
    isPendingForm: false,
    data: {},
    url: 'patients/pending-patient',
  });

  return (
    <>
      <main className='main'>
        <div className='main-container'>
          <h1 className='page-heading'>
            Orenda Psychiatry Provider Onboarding Form
          </h1>

          <p className='mx-auto max-w-3xl text-center'>
            This form is designed to facilitate your onboarding process with us.
          </p>

          <FormProvider {...methods}>
            <form
              className='clamp-[text,sm,base] provider-onboarding-form mt-10'
              onSubmit={onSubmit}
              noValidate
            >
              {/* Form content */}
              <div className='form-content space-y-20'>
                <Part1 />
                <Part2 />
              </div>

              {/* Terms and Conditions Agreement */}
              <fieldset className='clamp-[px,0,12] mx-auto mt-10 max-w-[47.5rem] rounded bg-transparent pb-0'>
                <div className='clamp-[pl,4,10] relative py-2 before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:rounded-full before:bg-[#B2B2B2]'>
                  <label className='clamp-[text,sm,0.93rem] flex w-full items-start gap-2'>
                    <input
                      className='mt-[5px] size-3.5 flex-shrink-0'
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
                        <PolicyDialog>
                          <button
                            type='button'
                            className='text-orenda-purple font-medium'
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
                </div>
              </fieldset>

              {/* Form submit button */}
              <Button
                isLoading={isSubmitting}
                type='submit'
                className='mx-auto mt-12'
              >
                {isSubmitting ? 'Submitting' : 'Submit Form'}
              </Button>

              {!!Object.entries(errors)?.length && (
                <p className='error !mt-4 text-center !text-sm font-semibold'>
                  Please ensure all required fields are filled out.
                </p>
              )}
            </form>
          </FormProvider>
        </div>
      </main>
    </>
  );
}
