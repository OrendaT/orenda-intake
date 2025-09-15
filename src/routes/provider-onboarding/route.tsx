import { createFileRoute } from '@tanstack/react-router';

// Importing necessary components and hooks
import { FormProvider, useForm } from 'react-hook-form';
import {
  getItem,
  parseOnboardingFormData,
  removeItem,
  removeLSItem,
} from '@/lib/utils';
import { FORM_IDS, FORMS } from '@/lib/constants';
import useSubmitForm from '@/hooks/use-submit-form';
import type { OnboardingFormData } from '@/types';
import { providerOnboardingInitialValues as initialValues } from '@/lib/definitions';

// Importing the component for Part 1 of the form
import Part1 from './-components/part-1';
import Part2 from './-components/part-2';
import SignaturePad from '@/components/ui/signature';
import ResponsiveTooltip from '@/components/responsive-tooltip';
import { PolicyDialog } from '@/components';
import SuccessModal from './-components/success-modal';
import PersistFormValues from '@/components/persist-form-values';
import SubmitButton from '@/components/ui/submit-button';
import { useSignature } from '@/store/signature';

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
  // beforeLoad: (ctx: { search: { code?: string } }) => {
  //   if (!ctx.search?.code) {

  //     throw new Error('You shall not pass!');
  //   }
  // },
});

function ProviderOnboardingForm() {
  const defaultValues = getItem(FORMS.provider_onboarding) || initialValues;
  const methods = useForm<OnboardingFormData>({
    defaultValues: defaultValues as OnboardingFormData,
  });
  const { handleSubmit, register, reset } = methods;

  const { mutateAsync: submitForm, isSuccess } = useSubmitForm({
    form: 'provider_onboarding',
    url: 'providers',
  });

  const resetSignature = useSignature((state) => state.resetSignature);

  const onSubmit = handleSubmit(async (data) => {
    // Parse the form data to ensure it matches the expected structure
    data = parseOnboardingFormData(data);

    await submitForm(data, {
      onSuccess: () => {
        removeItem(FORMS.provider_onboarding);
        reset(initialValues);
        removeLSItem(FORM_IDS.provider_onboarding);
        resetSignature();
      },
    });
  });

  console.log('route re-render');

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
                        required: 'Please agree to the terms and conditions',
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
              <SubmitButton />
            </form>

            <PersistFormValues
              saveKey={FORMS.provider_onboarding}
              formID={FORM_IDS.provider_onboarding}
              url='providers/pending-provider'
              fields={[
                {
                  key: 'name',
                  type: 'string',
                },
                {
                  key: 'email',
                  type: 'email',
                },
                {
                  key: 'date_of_birth',
                  type: 'date',
                },
                {
                  key: 'state',
                  type: 'string',
                  sendToDB: false,
                },
              ]}
              keysToRemove={['policy_agreement']}
            />
          </FormProvider>
        </div>
      </main>

      <SuccessModal open={isSuccess} />
    </>
  );
}
