import PersonalInfo from './personal-info';
import AddressDetails from './address-details';
import MentalHealth from './mental-health';

const PatientsDetails = () => {
  return (
    <fieldset className='fieldset'>
      <PersonalInfo />
      <AddressDetails />
      <MentalHealth />
    </fieldset>
  );
};

export default PatientsDetails;
