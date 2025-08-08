import IMask from '@/components/ui/imask';
import Input from '@/components/ui/input';
import Select from '@/components/ui/select';
import { US_STATES } from '@/lib/constants';

const Address = () => {
  return (
    <fieldset className='fieldset'>
      <h2 className='heading'>Address</h2>

      <Input label='Street Address' name='address_one' />
      <Input
        label='Address 2 (Apartment, suite, unit, building, floor etc)'
        name='address_two'
        placeholder='Apartment, suite, unit, building, floor, etc (optional)'
        required={false}
      />
      <div className='clamp-[gap-y,5,6] clamp-[gap-x,8,20] grid sm:grid-cols-2'>
        <Input
          label='City'
          name='city'
          errorMsg='City is required'
          size='small'
        />
        <Select label='State' name='state' options={US_STATES} size='small' />
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
        <Input
          name='residence'
          label='Residence (County or state)'
          required={false}
        />
      </div>
    </fieldset>
  );
};
export default Address;
