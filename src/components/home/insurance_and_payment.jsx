import FileInput from '../ui/file-input';
import IMask from '../ui/imask';
import Input from '../ui/input';
import Radios from '../ui/radios';

const InsuranceAndPayment = () => {
  return (
    <fieldset className='fieldset ~text-sm/base'>
      <h2 className='legend'>Insurance & Payment Info</h2>

      <section className='fieldset-section'>
        <div>
          <h3 className='label'>
            Please upload images of your insurance card&nbsp;
            <span className='text-red-500'>*</span>
          </h3>
          <p className='text-sm'>
            If you do not have insurance please upload a screenshot of this or
            some other file as you must upload something to proceed.
          </p>
        </div>
        <div className='grid ~gap-4/6'>
          <FileInput
            label='Front'
            name='insurance_card_front'
            required={true}
          />
          <FileInput label='Back' name='insurance_card_back' required={true} />
        </div>
      </section>
      <section className='fieldset-section'>
        <h3 className='fieldset-section-heading'>Credit Card Details</h3>
        <p className='font-medium'>
          Your copay/deductible is due at the time of your appointment. We
          require you to keep a credit card on file. You may use a health
          savings card if you have one. If you have any questions please contact
          us at <a href='tel:+13477077735'>(347) 707-7735</a>.
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
        <Input
          label='CVC / Security Code'
          name='cvc_security_code'
          required={true}
        />
        <Input
          label='Billing Zip Code'
          name='billing_zip_code'
          required={true}
        />
      </section>
    </fieldset>
  );
};
export default InsuranceAndPayment;
