import { useFormContext } from 'react-hook-form';
import Tooltip from '@mui/material/Tooltip';
import IMask from '../ui/imask';
import Input from '../ui/input';
import Radios from '../ui/radios';
import Select from '../ui/select';
import { usStates } from '../../lib/definitions';
import SelectCheckboxes from '../ui/select-checkboxes';
import ConditionalMentalHealthInfo from './conditional-mental-health-info';
import LifestyleAndHealth from './lifestyle-and-health';

const PatientsDetails = () => {
  const { watch, register } = useFormContext();
  const isMinorChildAppointment = watch('minor_child_appointment') === 'Yes';
  

  return (
    <fieldset className='fieldset'>

      <section className='fieldset-section '>
        <div className='!mt-4 grid gap-x-8 gap-y-6 sm:grid-cols-2'>
          <Input label='First Name' name='first_name' required={true} />
          <Input label='Last Name' name='last_name' required={true} />
        </div>

        <div className='!mt-4 grid gap-x-8 gap-y-6 sm:grid-cols-2'>
          <IMask
            label='Telephone Number'
            name='phone_number'
            mask='(999) 999-9999'
            type='tel'
            required={true}
          />

          <Input
            label='Email Address'
            name='email'
            type='email'
            required={true}
          />
        </div>

        <Input
          label='Date of Birth (dd/mm/yr)'
          name='date_of_birth'
          required={true}
          type='date'
          sx={{
            bgcolor: '#fff',
          }}
        />

        {/* Minor Child Appointment */}
        <div className='pt-[1em]'>
          <h4 className='label'>
            Is this appointment for a minor child?&nbsp;
            <span className='text-red-500'>*</span>
          </h4>
          <div className='flex items-center ~gap-5/7'>
            <Radios name='minor_child_appointment' options={['Yes', 'No']} />
          </div>

          {/* Conditional Acknowledgment Message & Checkbox */}
          {isMinorChildAppointment && (
            <div className='mt-4 p-3 border-l-4 border-gray-500 bg-gray-100 rounded'>
              <p className='text-gray-700 text-sm'>
                I understand and give permission for my child to be treated by an Orenda Psychiatry provider. As part of my minor child's treatment, their provider may prescribe medication as needed for their condition. I understand the provider may need to speak with me to discuss medication options and changes on an ongoing basis. I understand that I will be informed immediately about situations that could endanger my child. I know this decision to breach confidentiality in these circumstances is up to the Clinicians professional judgment and is in the best interest of my child. I will refrain from requesting detailed information about individual therapy sessions with my child. I understand that I will be provided with periodic updates about general progress, and/or may be asked to participate in therapy sessions as needed. I understand my provider may require one on one sessions with my child without the parent present and they may request to speak to the parent without the child present. Signing below indicates that you have reviewed the policies described above and understand the limits to confidentiality. If you have any questions as we progress with therapy, you can ask your therapist at any time.
              </p>
              <div className='mt-2'>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="acknowledgment"
                    className="w-4 h-4 accent-blue-500"
                    {...register('minorchild', {
                      required: 'This field is required',
                    })}
                  />
                  <label htmlFor="acknowledgment" className="text-sm text-gray-700">
                    I agree.
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sex Assigned at Birth */}
        <div className='pt-[1em]'>
          <h4 className='label flex items-center'>
            Sex assigned at birth:&nbsp;<span className='text-red-500'>*</span>
            <Tooltip
              title='This information is necessary for medical reasons related to psychiatric medications and treatment planning. This information will remain confidential.'
              placement='top'
            >
              <button
                type='button'
                className='ml-2 size-5 rounded-full bg-gray-400 text-[0.75em] leading-none text-white'
              >
                ?
              </button>
            </Tooltip>
          </h4>
          <div className='flex items-center ~gap-5/7'>
            <Radios name='sex_at_birth' options={['Male', 'Female']} />
          </div>
        </div>

        {/* Gender (Optional) */}
        <div className='pt-[1em]'>
          <h4 className='label'>Gender (Optional):</h4>
          <div className='grid gap-3 sm:grid-cols-3'>
            <Radios
              name='gender'
              options={[
                'Woman',
                'Man',
                'Cisgender',
                'Transgender',
                'Non-binary',
                'Genderqueer',
                'Genderfluid',
                'Agender',
                'Unsure',
                'Prefer not to answer',
                'Not Listed',
              ]}
              required={false}
            />
          </div>
        </div>
      </section>

      {/* Address Section */}
      <section className='fieldset-section'>
        <div className='!mt-2 grid ~gap-2/3'>
          <Input label='Address 1' name='address_1' required={true} />
          <Input
            label='Address 2'
            name='address_2'
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
            <Input
              label='Zip Code'
              name='zip_code'
              type='number'
              errorMsg='State is required'
              size='small'
            />
          </div>
        </div>
      </section>

      {/* More Information Section */}
      <section className='fieldset-section'>

        <div>
          <h4 className='label'>
            How did you hear about Orenda Psychiatry?&nbsp;
            <span className='text-red-500'>*</span>
          </h4>
          <div className='grid gap-3 sm:grid-cols-2'>
            <Radios
              name='referral_source'
              options={[
                'Google and other search engines',
                'Psychology Today',
                'Zocdoc',
                'Referral from a colleague or physician',
                'Other',
              ]}
            />
          </div>

          <div className='mt-7'>
            <h3 className='label'>
              What brings you to Orenda Psychiatry at this time? Is there
              something specific, such as a particular event?&nbsp;
              <span className='text-red-500'>*</span>
            </h3>
            <Input
              hiddenLabel
              name='reason_for_visit'
              required={true}
              multiline
              rows={1.5}
              variant='outlined'
            />
          </div>

          <div className='mt-7 mb-7'>
            <h3 className='label'>
              Tell us more about the type of mental health care that you are
              seeking:&nbsp;<span className='text-red-500'>*</span>
            </h3>
            <div className='grid gap-3 grid-cols-2'>
              <SelectCheckboxes
                name='mental_health_type'
                options={[
                  <>
                    Psychiatric Services <br /> (Medication Management)
                  </>,
                  'Therapy',
                  'Both',
                  "I'm not sure",
                ]}
                required={true}
              />
            </div>
          </div>
        </div>

        <div>
          <ConditionalMentalHealthInfo />
        </div>

        <div className='pt-5'>
          <h3 className='label'>
            Do you have current suicidal thoughts? If you have current suicidal
            thoughts, please immediately contact 9 1 1 or go to your nearest
            emergency room; or contact the National Suicide Prevention Hotline
            at: 1-800-273-8255.&nbsp;<span className='text-red-500'>*</span>
          </h3>
          <div className='flex items-center ~gap-5/7'>
            <Radios
              name='suicidal_thoughts?'
              options={['Yes', 'No']}
              required={true}
            />
          </div>
        </div>

        <LifestyleAndHealth/>
      </section>
    </fieldset>
  );
};

export default PatientsDetails;
