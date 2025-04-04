import CreditCardDetails from './credit-card-details';
import InsuranceDetails from './insurance-details';

const InsuranceAndPayment = () => {
  return (
    <fieldset className='fieldset ~text-sm/base'>
      <h2 className='legend'>Insurance & Payment Info</h2>

      <InsuranceDetails />
      <CreditCardDetails />
    </fieldset>
  );
};
export default InsuranceAndPayment;
