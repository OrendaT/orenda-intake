import Button from '@/components/ui/custom-button';
import DatePicker from '@/components/ui/date-picker';
import IMask from '@/components/ui/imask';
import Input from '@/components/ui/input';
import PaymentIcon from '@/components/ui/payment-icon';
import Select from '@/components/ui/select';
import SignaturePad from '@/components/ui/signature';
import useAutoSave from '@/hooks/use-auto-save';
import { CREDIT_CARD_FORM, US_STATES } from '@/lib/constants';
import { creditCardInitialValues } from '@/lib/definitions';
import { cn, getItem } from '@/lib/utils';
import type { CreditCardFormData } from '@/types';
import { InputAdornment } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { cvv, expirationDate, number } from 'card-validator';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export const Route = createFileRoute('/credit-card')({
  component: CreditCard,
});

function CreditCard() {
  const defaultValues = getItem(CREDIT_CARD_FORM) ?? creditCardInitialValues;
  const methods = useForm<CreditCardFormData>({
    defaultValues: defaultValues as CreditCardFormData,
  });

  const { handleSubmit, watch } = methods;

  const cc_number = watch('card_number');
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

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const formState = watch();

  useAutoSave({ key: CREDIT_CARD_FORM, value: formState });

  return (
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
                          'bg-white/30 text-base tracking-tighter blur-[4px]',
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
                  name='card_number'
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
                      return validation.isValid || 'Invalid credit card number';
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
                name='exp_date'
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
                name='cvv'
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
                    By signing below, I authorize Orenda Psychiatry to charge my
                    credit card for private pay sessions as follows:
                  </p>
                  <ul className='list-disc pl-5'>
                    <li>$300 for intake appointments </li>
                    <li>
                      $150–$250 for follow-up appointments (rate varies based on
                      session length)
                    </li>
                  </ul>
                </article>

                <article>
                  <h3 className='label font-semibold'>
                    Upfront Payment Agreement:
                  </h3>
                  <p>
                    I understand and agree that Orenda Psychiatry will charge my
                    credit card upfront to secure my appointment.
                  </p>
                </article>

                <article>
                  <h3 className='label font-semibold'>
                    Cancellation & Refund Policy:
                  </h3>
                  <p>
                    Full refund for cancellations made more than 24 hours before
                    the appointment
                  </p>
                </article>

                <article>
                  <h3 className='label font-semibold'>
                    Electronic Signature Acknowledgment
                  </h3>
                  <p>
                    By typing my name below, I acknowledge that this serves as
                    my electronic signature and has the same legal effect as a
                    handwritten signature under applicable law.
                  </p>
                </article>

                <SignaturePad className='-mt-2' name='signature' />
                <DatePicker label='Date' name='signature_date' />
              </div>
            </fieldset>
          </div>

          {/* Form submit button */}
          <Button type='submit' className='mx-auto mt-12'>
            Submit Form
          </Button>
        </form>
      </FormProvider>
    </main>
  );
}
