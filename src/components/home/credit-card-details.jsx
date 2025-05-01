import IMask from '@/components/ui/imask';

const CreditCardDetails = () => {
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
        mask={'999999999999999'}
        maskChar=''
      />
      <IMask
        label='Credit Card Expiration (mm/yy)'
        name='credit_card_exp_date'
        mask='99/99'
      />
      <IMask
        label='CVV / Security Code'
        name='credit_card_csv'
        mask={'9999'}
        maskChar=''
      />
      <IMask
        label='Billing Zip Code'
        name='billing_zip_code'
        mask={'99999'}
        maskChar=''
      />
    </section>
  );
};
export default CreditCardDetails;
