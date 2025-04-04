import { useFormContext } from 'react-hook-form';
import Tooltip from '@mui/material/Tooltip';
import IMask from '@/components/ui/imask';
import Input from '@/components/ui/input';
import Radios from '@/components/ui/radios';
import AgreementCheckbox from '@/components/ui/agreement-checkbox';
import DatePicker from '@/components/ui/date-picker';
import 'react-date-picker/dist/DatePicker.css';

const PersonalInfo = () => {
  const { watch } = useFormContext();
  const isMinorChildAppointment = watch('minor_child_appointment') === 'Yes';

  return (
    <section className='fieldset-section'>
      <div className='!mt-4 grid gap-x-8 gap-y-6 sm:grid-cols-2'>
        <Input label='First Name' name='first_name' />
        <Input label='Last Name' name='last_name' />
      </div>

      <div className='pt-4'>
        <h4 className='label'>
          Date of Birth&nbsp;
          <span className='text-orenda-purple'>*</span>
        </h4>

        <DatePicker name='date_of_birth' />
      </div>

      <div className='grid gap-x-8 gap-y-6 sm:grid-cols-2'>
        <IMask
          label='Phone Number'
          name='phone_number'
          mask='(999) 999-9999'
          type='tel'
        />

        <Input label='Email Address' name='email' type='email' />
      </div>

      {/* Minor Child Appointment */}
      <div className='pt-4'>
        <h4 className='label'>
          Is this appointment for a minor?&nbsp;
          <span className='text-orenda-purple'>*</span>
        </h4>
        <div className='flex items-center ~gap-5/7'>
          <Radios name='minor_child_appointment' options={['Yes', 'No']} />
        </div>

        {/* Conditional Acknowledgment Message & Checkbox */}
        {isMinorChildAppointment && (
          <>
            <div className='hidden-section mt-4'>
              <p className='mb-4'>
                <strong className='font-medium'>
                  Please note that the parent/guardian must join the beginning
                  of the first appointment with a minor.
                </strong>
              </p>

              <p className='text-sm text-gray-700'>
                I understand and give permission for my child to be treated by
                an Orenda Psychiatry provider. As part of my child&apos;s treatment,
                their provider may prescribe medication as needed for their
                condition. I understand the provider may need to speak with me
                to discuss medication options and changes on an ongoing basis. I
                understand that I will be informed immediately about situations
                that could endanger my child. I know that this decision to
                breach confidentiality in these circumstances is up to the
                clinician’s professional judgment and is in the best interest of
                my child. I will refrain from requesting detailed information
                about individual therapy sessions with my child. I understand
                that I will be provided with periodic updates about general
                progress, and/or may be asked to participate in therapy sessions
                as needed. I understand my provider may require one-on-one
                sessions with my child without any parent present and the
                provider may request to speak to a parent without the child
                present. <br />
                <br />
                <strong className='font-medium'>
                  BY SIGNING BELOW, I ACKNOWLEDGE THAT I HAVE REVIEWED THE
                  POLICIES DESCRIBED ABOVE AND UNDERSTAND THE LIMITS TO
                  CONFIDENTIALITY.
                </strong>
              </p>

              <AgreementCheckbox
                label='I agree'
                name='minor_child_agreement'
                className='mt-2'
                errorMsg='This field is required'
              />
            </div>

            <div className='mt-4 flex flex-col gap-x-8 gap-y-6 sm:flex-row'>
              <Input label='Your Name (Guardian)' name='guardian_name' />
              <Input
                label='Relationship to child'
                name='relationship_to_child'
              />
            </div>
          </>
        )}
      </div>

      {/* Sex Assigned at Birth */}
      <div className='pt-[1em]'>
        <h4 className='label flex items-center'>
          Sex assigned at birth:&nbsp;
          <span className='text-orenda-purple'>*</span>
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
      <Input label='Gender (Optional)' name='city' required={false} />
    </section>
  );
};
export default PersonalInfo;
