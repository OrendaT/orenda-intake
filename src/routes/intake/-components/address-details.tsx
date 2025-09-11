import Input from '@/components/ui/input';
import Select from '@/components/ui/select';
import IMask from '../../../components/ui/imask';
import Radios from '../../../components/ui/radios';
import { US_STATES } from '@/lib/constants';

const AddressDetails = () => {
  return (
    <>
      <h2 className='legend'>Address</h2>
      <fieldset className='fieldset'>
        <Input label='Address 1' name='address_one' />

        <Input
          label='Address 2'
          name='address_two'
          placeholder='Apartment, suite, unit, building, floor, etc (optional)'
          required={false}
        />
        
        <div className='clamp-[gap-x,8,16] grid gap-y-5 sm:grid-cols-3'>
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
        </div>

        <Radios
          label='Will your appointments generally be at this address?'
          name='appointment_address'
          containerClassName='mt-5'
          options={[{ value: 'Yes' }, { value: 'No' }]}
          showHiddenSectionValue={'No'}
          grid={false}
          hiddenSection={
            <>
              <p className='mb-2 font-medium'>
                <small>
                  Please provide the address where the appointment will take
                  place.
                </small>
              </p>

              <div className='clamp-[gap-x,8,16] grid gap-y-5 sm:grid-cols-2'>
                <Input
                  label='Appointment Address'
                  name='appointment_address_address'
                  errorMsg='Appointment address is required'
                  size='small'
                />
                <IMask
                  label='Zip Code'
                  name='appointment_address_zip_code'
                  errorMsg='Zip code is required'
                  inputProps={{
                    size: 'small',
                  }}
                  mask={'99999'}
                  maskChar=''
                />
                <Input
                  label='Appointment City'
                  name='appointment_city'
                  errorMsg='City is required'
                  size='small'
                />
                <Select
                  label='Appointment State'
                  name='appointment_state'
                  options={US_STATES}
                  size='small'
                />
              </div>
            </>
          }
        />
      </fieldset>
    </>
  );
};
export default AddressDetails;
