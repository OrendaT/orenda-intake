import Input from '@/components/ui/input';
import Select from '@/components/ui/select';
import { usStates } from '@/lib/definitions';
import IMask from '../ui/imask';
import Radios from '../ui/radios';

/* Address Section, Tel & Email */
const AddressDetails = () => {
  return (
    <fieldset className='fieldset'>
      <h2 className='legend'>Address</h2>

      <section className='fieldset-section'>
        <div className='!mt-2 grid ~gap-2/3'>
          <Input label='Address 1' name='address_one' />
          <Input
            label='Address 2'
            name='address_two'
            placeholder='Apartment, suite, unit, building, floor, etc (optional)'
            required={false}
          />
          <div className='grid gap-y-5 ~gap-x-8/16 sm:grid-cols-3'>
            <Input
              label='City'
              name='city'
              errorMsg='City is required'
              size='small'
            />
            <Select
              label='State'
              name='state'
              options={usStates}
              size='small'
            />
            <IMask
              label='Zip Code'
              name='zip_code'
              errorMsg='State is required'
              size='small'
              mask={'99999'}
              maskChar=''
            />
          </div>

          <Radios
            label='Will your appointments generally be at this address?'
            name='appointment_address'
            containerClassName='mt-5'
            options={['Yes', 'No']}
            showHiddenSectionValue={1}
            grid={false}
            hiddenSection={
              <>
                <p className='mb-2'>
                  <strong className='font-medium'>
                    Please provide the city/state where the appointment will
                    take place.
                  </strong>
                </p>

                <div className='grid gap-y-5 ~gap-x-8/16 sm:grid-cols-2'>
                  <Input
                    label='Appointment City'
                    name='appointment_city'
                    errorMsg='City is required'
                    size='small'
                  />
                  <Select
                    label='Appointment State'
                    name='appointment_state'
                    options={usStates}
                    size='small'
                  />
                </div>
              </>
            }
          />
        </div>
      </section>
    </fieldset>
  );
};
export default AddressDetails;
