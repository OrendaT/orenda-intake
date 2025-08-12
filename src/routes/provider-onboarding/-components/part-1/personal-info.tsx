import DatePicker from '@/components/ui/date-picker';
import Input from '@/components/ui/input';

const PersonalInfo = () => {
  return (
    <fieldset className='fieldset'>
      <h3 className='heading'>Personal Information</h3>

      <Input name='name' label='Full Name (All names ever used)' />
      <DatePicker
        name='date_of_birth'
        label='Date of Birth'
        maxDate={new Date()}
      />
      <Input name='email' label='Email Address' />
      <Input name='social_security_number' label='Social Security Number' />
    </fieldset>
  );
};
export default PersonalInfo;
