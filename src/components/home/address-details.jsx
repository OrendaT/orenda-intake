import Input from '@/components/ui/input';
import Select from '@/components/ui/select';
import { usStates } from '@/lib/definitions';
import IMask from '../ui/imask';
import Radios from '../ui/radios';
import { useFormContext } from 'react-hook-form';

/* Address Section, Tel & Email */
const AddressDetails = () => {
  const { watch } = useFormContext();
  const isDifferentAddress = watch('same_address') === 'No';

  return (
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
          <Select label='State' name='state' options={usStates} size='small' />
          <IMask
            label='Zip Code'
            name='zip_code'
            errorMsg='State is required'
            size='small'
            mask={'99999'}
            maskChar=''
          />
        </div>

        <div className='mt-5'>
          <h3 className='label'>
            Will your appointments generally be at this address?&nbsp;
            <span className='text-orenda-purple'>*</span>
          </h3>
          <div className='flex items-center ~gap-5/7'>
            <Radios name='appointment_address' options={['Yes', 'No']} />
          </div>

          {isDifferentAddress && (
            <div className='mt-4 bg-transparent hidden-section'>
              <p className='mb-2'>
                <strong className='font-medium'>
                  Please provide the city/state where the appointment will take
                  place.
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
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default AddressDetails;
