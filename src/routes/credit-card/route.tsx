import Button from '@/components/ui/custom-button';
import DatePicker from '@/components/ui/date-picker';
import IMask from '@/components/ui/imask';
import Input from '@/components/ui/input';
import PaymentIcon from '@/components/ui/payment-icon';
import Select from '@/components/ui/select';
import SignaturePad from '@/components/ui/signature';
import useCreatePendingForm from '@/hooks/use-create-pending-form';
import useAutoSave from '@/hooks/use-auto-save';
import useSignature from '@/hooks/use-signature';
import useSubmitForm from '@/hooks/use-submit-form';
import { FORM_IDS, FORMS, US_STATES } from '@/lib/constants';
import { creditCardInitialValues as initialValues } from '@/lib/definitions';
import {
  cn,
  getItem,
  parseCCFormData,
  removeItem,
  removeLSItem,
} from '@/lib/utils';
import type { CreditCardFormData } from '@/types';
import { InputAdornment } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { cvv, expirationDate, number } from 'card-validator';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import SuccessModal from './-components/success-modal';

export const Route = createFileRoute('/credit-card')({
  component: CreditCard,
  head: () => ({
    meta: [
      {
        title: 'Credit Card Form | Orenda',
        description: 'Credit Card Form for Orenda',
      },
    ],
  }),
});

function CreditCard() {
  const defaultValues = getItem(FORMS.credit_card) ?? initialValues;
  const methods = useForm<CreditCardFormData>({
    defaultValues: defaultValues as CreditCardFormData,
  });
  const { resetSignature } = useSignature();
  const { mutateAsync: submitForm, isSuccess } = useSubmitForm({
    form: 'credit_card',
    url: 'credit-cards',
  });

  const {
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = methods;

  const cc_number = watch('credit_card_number');
  const [hideCardNumber, setHideCardNumber] = useState(true);
  const [cardDetails, setCardDetails] = useState(() => {
    const validation = number(cc_number);
    return {
      number: cc_number || '',
      type: validation?.card?.type || '',
      length: validation?.card?.lengths[0] || 16,
      cvv_length: validation?.card?.code.size || 3,
    };
  });

  const onSubmit = handleSubmit(async (data) => {
    data = parseCCFormData(data);
    const res = await submitForm(data);

    if (res?.data.success) {
      removeItem(FORMS.credit_card);
      removeLSItem(FORM_IDS.credit_card);
      resetSignature();
      reset(initialValues);
    }
  });

  const formState = watch();

  useAutoSave({ key: FORMS.credit_card, value: formState });

  const { patient_name, cardholder_name, date_of_birth, address_one, city } =
    formState;

  useCreatePendingForm({
    formID: 'credit_card_id',
    isPendingForm: Boolean(
      patient_name?.length > 1 &&
        cardholder_name?.length > 3 &&
        date_of_birth &&
        address_one &&
        city,
    ),
    data: {
      patient_name,
      cardholder_name,
      date_of_birth: new Date(date_of_birth).toLocaleDateString('en-US'),
    },
    url: 'credit-cards/pending-credit-card',
  });

  return (
    <>
      <main className='main'>
        <h1 className='page-heading'>Orenda Credit Card Form</h1>

        <FormProvider {...methods}>
          <form
            className='clamp-[text,sm,base] mt-10'
            onSubmit={onSubmit}
            noValidate
          >
            {/* Form content */}
            <div className='form-content'>
              <h2 className='legend'>Personal Information</h2>
              <fieldset className='fieldset'>
                <Input label='Patient Name' name='patient_name' />

                <DatePicker
                  label='Date of Birth'
                  name='date_of_birth'
                  containerClassName='mt-4'
                />

                <Input label='Cardholder Name' name='cardholder_name' />
              </fieldset>

              <h2 className='legend'>Billing Address</h2>
              <fieldset className='fieldset'>
                <Input label='Street Address' name='address_one' />
                <Input
                  label='Address - Line 2'
                  name='address_two'
                  placeholder='Apartment, suite, unit, building, floor, etc (optional)'
                  required={false}
                />
                <div className='clamp-[gap-x,8,16] grid gap-y-5 sm:grid-cols-3'>
                  <Input
                    label='City'
                    name='city'
                    errorMsg='City is required'
                    size='small'
                  />
                  <Select
                    label='State'
                    name='state'
                    options={US_STATES}
                    size='small'
                  />
                  <IMask
                    label='Zip Code'
                    name='zip_code'
                    errorMsg='State is required'
                    inputProps={{
                      size: 'small',
                    }}
                    mask={'99999'}
                    maskChar=''
                  />
                </div>
              </fieldset>

              <h2 className='legend'>Credit Card Information</h2>
              <fieldset className='fieldset'>
                <div className='relative'>
                  <div
                    className={cn(
                      'pointer-events-none absolute top-5 left-0 z-10 ml-[1.79rem] flex items-end bg-white transition-opacity duration-300',
                      {
                        'opacity-0': !hideCardNumber,
                      },
                    )}
                  >
                    {Array.from({ length: cardDetails.number.length }).map(
                      (_, index) => (
                        <span
                          key={index}
                          className={cn(
                            'bg-white/30 clamp-[text,sm,base] tracking-tighter blur-[4px]',
                            cardDetails.number[index] === ' ' && 'w-2.5',
                          )}
                        >
                          {cardDetails.number[index]}
                        </span>
                      ),
                    )}
                  </div>

                  <IMask
                    label='Card Number'
                    name='credit_card_number'
                    mask={
                      cardDetails.type === 'american-express'
                        ? '9999 9999 9999 999'
                        : '9999 9999 9999 9999'
                    }
                    maskChar=''
                    onFocus={() => setHideCardNumber(false)}
                    onBlur={() => setHideCardNumber(true)}
                    inputProps={{
                      slotProps: {
                        input: {
                          startAdornment: (
                            <InputAdornment position='start'>
                              <PaymentIcon type={cardDetails.type} />
                            </InputAdornment>
                          ),
                        },
                      },
                    }}
                    validations={{
                      card_number: (value: string) => {
                        const cardNumber = value.replace(/\s/g, '');
                        const validation = number(cardNumber);
                        return (
                          validation.isValid || 'Invalid credit card number'
                        );
                      },
                    }}
                    rules={{
                      onChange: ({ target: { value } }) => {
                        const cardNumber = value.replace(/\s/g, '');
                        const validation = number(cardNumber);
                        setCardDetails({
                          number: value,
                          type: validation?.card?.type || '',
                          length: validation?.card?.lengths[0] || 16,
                          cvv_length: validation?.card?.code.size || 3,
                        });
                      },
                    }}
                  />
                </div>

                <IMask
                  label='Expiration Date (mm/yy)'
                  name='credit_card_exp_date'
                  mask='99/99'
                  validations={{
                    exp_date: (value) => {
                      const validation = expirationDate(value);
                      return validation.isValid || 'Invalid expiration date';
                    },
                  }}
                />
                <IMask
                  label='CVV'
                  name='credit_card_csv'
                  mask={cardDetails.cvv_length === 3 ? '999' : '9999'}
                  maskChar=''
                  validations={{
                    credit_card_csv: (value) => {
                      const validation = cvv(value, cardDetails.cvv_length);
                      return validation.isValid || 'Invalid CVV';
                    },
                  }}
                />

                <div className='mt-5 space-y-5'>
                  <article>
                    <p>
                      Private Pay sessions will be billed up front according to
                      the following schedule:
                    </p>
                    <ul className='list-disc pl-5'>
                      <li>$300 for intake appointments </li>
                      <li>
                        $150-$250 for follow-up appointment (rate varies based
                        on session length)
                      </li>
                    </ul>
                  </article>

                  {/* <article>
                  <h3 className='label font-semibold'>
                    Upfront Payment Agreement:
                  </h3>
                  <p>
                    I understand and agree that Orenda Psychiatry will charge my
                    credit card upfront to secure my appointment.
                  </p>
                </article> */}

                  <article>
                    <h3 className='label font-semibold'>
                      Cancellation & Refund Policy:
                    </h3>
                    <p>
                      Full refund will be issued for cancellations made more
                      than 24 hours prior to scheduled appointment.
                    </p>
                  </article>

                  <p>
                    By electronically signing my name below, I authorize Orenda
                    to charge my credit card, debit card, HSA or FSA Card,
                    and/or financial account number (collectively, “Payment
                    Method”) in connection with any and all provider sessions I
                    receive through Orenda. I further authorize Orenda to
                    maintain my Payment Method on file to pay for any and all
                    such sessions until I revoke my authorization. I understand
                    that a copy of my current Payment Authorization can be
                    provided upon request.
                  </p>

                  <SignaturePad className='-mt-2' name='signature' />
                  <DatePicker label='Date' name='signature_date' />
                </div>
              </fieldset>
            </div>

            {/* Form submit button */}
            <Button
              type='submit'
              className='mx-auto mt-12'
              isLoading={isSubmitting}
            >
              {isSubmitting ? 'Submitting' : 'Submit Form'}
            </Button>
          </form>
        </FormProvider>
      </main>

      <SuccessModal open={isSuccess} />
    </>
  );
}
