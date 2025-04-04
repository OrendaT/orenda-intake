import { useFormContext } from 'react-hook-form';
import IMask from '@/components/ui/imask';
import Input from '@/components/ui/input';
import Radios from '@/components/ui/radios';
import AgreementCheckbox from '@/components/ui/agreement-checkbox';

const MentalHealth = () => {
  const { watch } = useFormContext();
  const isHearingImpairments =
    watch('hearing_impairments?') ===
    'Yes, I have a hearing impairment that does require accommodations.';

  const healthType = watch('mental_health_type');
  const needsTherapy = ['Both', 'Therapy'].includes(healthType);

  return (
    <section className='fieldset-section'>
      <div>
        <div className='~mt-5/7'>
          <h3 className='label'>
            What brings you to Orenda Psychiatry at this time? Is there
            something specific, such as a particular event?&nbsp;
            <span className='text-orenda-purple'>*</span>
          </h3>
          <Input
            hiddenLabel
            name='reason_for_visit'
            multiline
            rows={1.5}
            variant='outlined'
          />
        </div>

        <div className='mb-7 mt-7'>
          <h3 className='label'>
            Tell us more about the type of mental health care that you are
            seeking:&nbsp;<span className='text-orenda-purple'>*</span>
          </h3>
          <div className='grid grid-cols-2 gap-3'>
            <Radios
              name='mental_health_type'
              options={[
                `Psychiatric Services 
              (Medication Management)`,
                'Therapy',
                'Both',
                "I'm not sure",
              ]}
            />
          </div>

          {needsTherapy && (
            <>
              <div className='hidden-section mt-4'>
                <p className='text-sm text-gray-700'>
                  Please note that not all our providers offer therapy services
                  at this time, and the first available therapy appointment
                  might be a few days out.
                </p>

                <div className='mt-5 grid grid-cols-2'>
                  <Radios
                    name='unavailable_therapy_agreement'
                    errorMsg='This field is required'
                    options={[
                      'I understand',
                      'I need to see someone immediately',
                    ]}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className='pt-5'>
        <h3 className='label'>
          Do you have current suicidal thoughts? If you have current suicidal
          thoughts, please immediately contact 911 or go to your nearest
          emergency room; or contact the National Suicide Prevention Hotline at:
          1-800-273-8255.&nbsp;
          <span className='text-orenda-purple'>*</span>
        </h3>
        <div className='flex items-center ~gap-5/7'>
          <Radios name='suicidal_thoughts?' options={['Yes', 'No']} />
        </div>
      </div>

      <div>
        <h3 className='label'>
          Do you have any hearing impairments that would affect your
          participation in sessions or require accommodations?&nbsp;
          <span className='text-orenda-purple'>*</span>
        </h3>
        <div className='grid grid-cols-2 gap-3'>
          <Radios
            name='has_hearing_impairments'
            options={[
              'No, I do not have any hearing impairments.',
              'Yes, I have a hearing impairment that does require accommodations.',
            ]}
            required={true}
          />
        </div>

        {isHearingImpairments && (
          <div className='mt-4 rounded border-l-4 border-gray-500 bg-gray-100 p-3'>
            <p className='text-sm text-gray-700'>
              If you utilize an interpreter service due to a hearing impairment,
              rest assured that they can seamlessly join your video session
              using the same link provided to you. To enable this, simply
              initiate the process by granting permission within the messaging
              app on Doxy.me for your provider to invite your interpreter.
              Should you require further clarification or assistance, feel free
              to reach out to our intake department via Call, Text, or Email at
              (347) 707-7735 or intake@orendapsych.com.
            </p>
            <AgreementCheckbox
              label='I understand'
              name='hearing_impairment_agreement'
              className='mt-2'
              errorMsg='This field is required'
            />
          </div>
        )}
      </div>

      <div>
        <h3 className='label'>
          Who would you like us to contact in the event of an emergency? What is
          this person&apos;s relationship to you?&nbsp;
          <span className='text-orenda-purple'>*</span>
        </h3>
        <Input
          hiddenLabel
          name='emergency_contact'
          required={true}
          variant='outlined'
        />
      </div>

      <IMask
        label='Emergency Contact Phone Number'
        name='emergency_contact_number'
        type='tel'
        mask='(999) 999-9999'
        required={true}
      />
    </section>
  );
};
export default MentalHealth;
