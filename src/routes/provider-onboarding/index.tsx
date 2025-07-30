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

export const Route = createFileRoute('/provider-onboarding/')({
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
