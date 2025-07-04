import IMask from '@/components/ui/imask';
import Input from '@/components/ui/input';
import Radios from '@/components/ui/radios';
import DatePicker from '@/components/ui/date-picker';
import 'react-date-picker/dist/DatePicker.css';
import Signature from '../ui/signature';
import ResponsiveTooltip from '../responsive-tooltip';

export default function PersonalInfo() {
  return (
    <section className='fieldset-section'>
      <div className='!mt-4 grid gap-x-8 gap-y-6 sm:grid-cols-2'>
        <Input label='First Name' name='first_name' />
        <Input label='Last Name' name='last_name' />
      </div>

      <DatePicker
        label='Date of Birth'
        name='date_of_birth'
        containerClasses='pt-4'
      />

      <div className='grid gap-x-8 gap-y-6 sm:grid-cols-2'>
        <IMask
          label='Phone Number'
          name='phone'
          mask='(999) 999-9999'
          type='tel'
        />

        <Input label='Email Address' name='email' type='email' />
      </div>

      {/* Minor Child Appointment */}
      <Radios
        label='Is this appointment for a minor?'
        name='for_minor_child'
        options={['Yes', 'No']}
        grid={false}
        showHiddenSectionValue={0}
        hiddenSection={
          <>
            <p className='mb-4'>
              <strong className='font-medium'>
                Please note that the parent/guardian must join the beginning of
                the first appointment with a minor.
              </strong>
            </p>
            <p className='text-sm text-gray-700'>
              I understand and give permission for my child to be treated by an
              Orenda Psychiatry provider. As part of my child&apos;s treatment,
              their provider may prescribe medication as needed for their
              condition. I understand the provider may need to speak with me to
              discuss medication options and changes on an ongoing basis. I
              understand that I will be informed immediately about situations
              that could endanger my child. I know that this decision to breach
              confidentiality in these circumstances is up to the clinician’s
              professional judgment and is in the best interest of my child. I
              will refrain from requesting detailed information about individual
              therapy sessions with my child. I understand that I will be
              provided with periodic updates about general progress, and/or may
              be asked to participate in therapy sessions as needed. I
              understand my provider may require one-on-one sessions with my
              child without any parent present and the provider may request to
              speak to a parent without the child present. <br />
              <br />
              <strong className='font-medium'>
                BY SIGNING BELOW, I ACKNOWLEDGE THAT I HAVE REVIEWED THE
                POLICIES DESCRIBED ABOVE AND UNDERSTAND THE LIMITS TO
                CONFIDENTIALITY.
              </strong>
            </p>
            <Signature
              name='guardian_signature'
              options={{ shouldUnregister: true }}
            />

            <div className='mt-4 flex flex-col gap-x-8 gap-y-6 sm:flex-row'>
              <Input
                label='Your Name (Guardian)'
                name='guardian_name'
                registerOptions={{ shouldUnregister: true }}
              />
              <Input
                label='Relationship to child'
                name='relationship_with_child'
                registerOptions={{ shouldUnregister: true }}
              />
            </div>
          </>
        }
      />

      {/* Sex Assigned at Birth */}

      <Radios
        label={`Patient's sex assigned at birth:`}
        labelSuffix={
          <ResponsiveTooltip
            content={`This information is necessary for medical reasons related to
              psychiatric medications and treatment planning. This information
              will remain confidential.`}
          />
        }
        name='sex_assigned_at_birth'
        options={['Male', 'Female']}
        grid={false}
      />

      {/* Gender (Optional) */}
      <Input
        label={
          <>
            Patient's Gender <small>(Optional)</small>
          </>
        }
        name='gender'
        required={false}
      />
    </section>
  );
}
