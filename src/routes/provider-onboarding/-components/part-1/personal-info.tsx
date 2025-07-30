import DatePicker from '@/components/ui/date-picker';
import Input from '@/components/ui/input';

const PersonalInfo = () => {
  return (
    <fieldset className='fieldset'>
      <h3 className='heading'>Personal Information</h3>

      <Input name='full_name' label='Full Name (All names ever used)' />
      <DatePicker name='date_of_birth' label='Date of Birth' />
      <Input name='ssn' label='Social Security Number' />
    </fieldset>
  );
};
export default PersonalInfo;
