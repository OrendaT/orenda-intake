import DatePicker from '@/components/ui/date-picker';
import IMask from '@/components/ui/imask';
import Input from '@/components/ui/input';

const PersonalInfo = () => {
  return (
    <fieldset className='fieldset'>
      <h3 className='heading'>Personal Information</h3>

      <Input name='name' label='Full Name' />
      <Input name='all_names_used' label='All Names Ever Used' />
      <DatePicker
        name='date_of_birth'
        label='Date of Birth'
        maxDate={new Date()}
      />
      <Input name='email' label='Email Address' type='email' />
      <IMask
        name='social_security_number'
        label='Social Security Number'
        mask={'999999999'}
        maskChar=''
      />
    </fieldset>
  );
};
export default PersonalInfo;
