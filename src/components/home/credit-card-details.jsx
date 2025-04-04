import IMask from '@/components/ui/imask';
import Input from '@/components/ui/input';

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

      <Input
        label='Credit Card Number'
        name='credit_card_number'
        required={true}
      />
      <IMask
        label='Credit Card Expiration (mm/yy)'
        name='credit_card_expiration'
        mask='99/99'
        required={true}
      />
      <Input label='CVV / Security Code' name='cvv' required={true} />
      <Input label='Billing Zip Code' name='billing_zip_code' required={true} />
    </section>
  );
};
export default CreditCardDetails;
