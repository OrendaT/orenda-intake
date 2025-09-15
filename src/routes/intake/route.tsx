import { createFileRoute } from '@tanstack/react-router';
import { FormProvider, useForm } from 'react-hook-form';
import {
  getItem,
  parseIntakeFormData,
  removeItem,
  removeLSItem,
} from '@/lib/utils';
import { FORM_IDS, FORMS } from '@/lib/constants';
import useSubmitForm from '@/hooks/use-submit-form';
import { intakeInitialValues as initialValues } from '@/lib/definitions';
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
import SuccessModal from '@/routes/intake/-components/success-modal';
import type { IntakeFormData } from '@/types';
import { useSignature } from '@/store/signature';
import SubmitButton from '@/components/ui/submit-button';
import PersistFormValues from '@/components/persist-form-values';

export const Route = createFileRoute('/intake')({
  component: IntakeForm,
  head: () => ({
    meta: [
      {
        title: 'Intake Form | Orenda',
        description:
          'Complete the Orenda Intake Form to get started with your mental health journey.',
      },
    ],
  }),
});

export function IntakeForm() {
  const defaultValues = getItem(FORMS.intake) ?? initialValues;
  const methods = useForm<IntakeFormData>({
    defaultValues: defaultValues as IntakeFormData,
  });
  const { handleSubmit, register, reset } = methods;
  const { isSuccess, mutateAsync: submitForm } = useSubmitForm({
    form: 'intake',
    url: 'patients',
  });
  const resetSignature = useSignature((state) => state.resetSignature);

  const onSubmit = handleSubmit(async (data) => {
    // parse intake form data
    data = parseIntakeFormData(data);

    const res = await submitForm(data);

    if (res?.data.success) {
      removeItem(FORMS.intake);
      reset(initialValues);
      removeLSItem(FORM_IDS.intake);
      resetSignature();
    }
  });

  return (
    <>
      <main className='main'>
        <div className='main-container'>
          <h1 className='page-heading'>Orenda Intake Form</h1>

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
              If you or someone you know is actively considering suicide or
              self-harm, please immediately call <a href='tel:911'>911</a> or
              the Suicide Prevention Hotline at{' '}
              <a href='tel:+18002738255'>1-800-273-8255</a>. Immediate help is
              available.
            </em>
          </p>

          <FormProvider {...methods}>
            <form
              className='clamp-[text,sm,base] mt-10'
              onSubmit={onSubmit}
              noValidate
            >
              {/* Form content */}
              <div className='form-content'>
                <PersonalInfo />

                <AddressDetails />

                <MentalHealth />

                <InsuranceDetails />

                <CreditCardDetails />
              </div>

              {/* Terms and Conditions Agreement */}
              <fieldset className='clamp-[px,0,12] mx-auto max-w-[51rem] rounded bg-transparent pb-0'>
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
              <SubmitButton />
            </form>

            <PersistFormValues
              saveKey='intake'
              formID='intake_id'
              url='patients/pending-patient'
              fields={[
                {
                  key: 'first_name',
                  type: 'string',
                },
                {
                  key: 'last_name',
                  type: 'string',
                },
                {
                  key: 'email',
                  type: 'email',
                },
                {
                  key: 'phone',
                  type: 'string',
                  sendToDB: false,
                },
              ]}
              keysToRemove={['policy_agreement']}
            />
          </FormProvider>
        </div>
      </main>

      {isSuccess && <SuccessModal open={isSuccess} />}
    </>
  );
}
