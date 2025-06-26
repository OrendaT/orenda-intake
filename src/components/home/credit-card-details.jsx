import IMask from '@/components/ui/imask';
import { InputAdornment } from '@mui/material';
import { number, expirationDate, cvv, postalCode } from 'card-validator';
import { useState } from 'react';
import PaymentIcon from '../ui/payment-icon';

const CreditCardDetails = () => {
  const [cardDetails, setCardDetails] = useState({
    type: '',
    length: 16,
    cvv_length: 3,
  });

  return (
    <section className='fieldset-section'>
      <h3 className='fieldset-section-heading mt-4'>Credit Card Details</h3>
      <p className='~text-sm/base'>
        Your copay/deductible is due at the time of your appointment. We require
        you to keep a credit card on file. You may use a health savings card if
        you have one. If you have any questions please contact us at{' '}
        <a href='tel:+13477077735'>(347) 707-7735</a>.
      </p>

      <IMask
        label='Credit Card Number'
        name='credit_card_number'
        mask={
          cardDetails.type === 'american-express'
            ? '9999 9999 9999 999'
            : '9999 9999 9999 9999'
        }
        maskChar=''
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
          credit_card_number: (value) => {
            const cardNumber = value.replace(/\s/g, '');
            const validation = number(cardNumber);
            return validation.isValid || 'Invalid credit card number';
          },
        }}
        registerOptions={{
          onChange: ({ target: { value } }) => {
            const cardNumber = value.replace(/\s/g, '');
            const validation = number(cardNumber);
            setCardDetails({
              type: validation?.card?.type || '',
              length: validation?.card?.lengths[0] || 16,
              cvv_length: validation?.card?.code.size || 3,
            });
          },
        }}
      />
      <IMask
        label='Credit Card Expiration (mm/yy)'
        name='credit_card_exp_date'
        mask='99/99'
        validations={{
          credit_card_exp_date: (value) => {
            const validation = expirationDate(value);
            return validation.isValid || 'Invalid expiration date';
          },
        }}
      />
      <IMask
        label='CVV / Security Code'
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
      <IMask
        label='Billing Zip Code'
        name='billing_zip_code'
        mask={'99999'}
        maskChar=''
        validations={{
          billing_zip_code: (value) => {
            const validation = postalCode(value);
            return validation.isValid || 'Invalid zip code';
          },
        }}
      />
    </section>
  );
};
export default CreditCardDetails;
