import { useFormContext } from 'react-hook-form';
import IMask from '@/components/ui/imask';
import Input from '@/components/ui/input';
import Radios from '@/components/ui/radios';
import AgreementCheckbox from '@/components/ui/agreement-checkbox';
import Checkboxes from '../ui/checkboxes';
import SignatureMaker from '../ui/signature';

const MentalHealth = () => {
  const { watch } = useFormContext();
  const hasHearingImpairment =
    watch('hearing_impairment') ===
    'Yes, I have a hearing impairment that does require accommodations.';

  const healthType = watch('mental_health_care_type');
  const needsTherapy = ['Both', 'Therapy'].includes(healthType);

  const symptoms = watch('symptoms_past_six_months');
  const hasOtherSymptoms =
    Array.isArray(symptoms) && symptoms.includes('Other');

  const hasAbnormalResults =
    watch('recent_physical_exam') === 'Yes, and there were abnormal results';

  const beenHospitalized = watch('hospitalized_psych') === 'Yes';

  const history = watch('personal_medical_history');
  const hasOtherMedical = Array.isArray(history) && history.includes('Other');

  return (
    <section className='fieldset-section'>
      <div className='~mt-5/7'>
        <h3 className='label'>
          What brings you to Orenda Psychiatry at this time? Is there something
          specific, such as a particular event?&nbsp;
          <span className='text-orenda-purple'>*</span>
        </h3>
        <Input
          hiddenLabel
          name='reason_for_visit'
          multiline
          rows={2}
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
            name='mental_health_care_type'
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
                Please note that not all our providers offer therapy services at
                this time, and the first available therapy appointment might be
                a few days out.
              </p>

              <div className='mt-5 grid grid-cols-2'>
                <Radios
                  name='therapy_availability'
                  errorMsg='This field is required'
                  options={[
                    'I understand',
                    'I need to see someone immediately',
                  ]}
                  registerOptions={{
                    shouldUnregister: true,
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>

      <div>
        <h3 className='label'>
          Have you seen a mental health professional before?&nbsp;
          <span className='text-orenda-purple'>*</span>
        </h3>
        <div className='grid grid-cols-2 gap-3'>
          <Radios
            name='seen_health_professional'
            options={[
              'Yes, for therapy only.',
              'Yes, a psychiatrist or psychiatric NP for medication management.',
              'I have experience with both therapy and psychotropic medication.',
              'No, this is my first encounter with a mental health professional.',
            ]}
          />
        </div>
      </div>

      <div>
        <h3 className='label'>
          Please check any of the following you have experienced in the past six
          months
        </h3>
        <div className='mb-3 grid sm:grid-cols-2'>
          <Checkboxes
            name='symptoms_past_six_months'
            options={[
              'Increased appetite',
              'Decreased appetite',
              'Trouble concentrating',
              'Difficulty sleeping',
              'Excessive sleep',
              'Low motivation',
              'Isolation from others',
              'Fatigue/low energy',
              'Low self-esteem',
              'Depressed mood',
              'Tearful or crying spells',
              'Anxiety',
              'Fear',
              'Hopelessness',
              'Panic',
              'Self Harm',
              'Thoughts/urges to harm others',
              'None Apply',
              'Other',
            ]}
          />
        </div>

        {hasOtherSymptoms && (
          <Input
            label='Other? Please specify'
            name='symptoms_other'
            required={hasOtherSymptoms}
          />
        )}
      </div>

      <div>
        <h3 className='label'>
          Specify all medications and supplements you are presently taking and
          for what reason. If you do not take any medications, just write
          "none"&nbsp;
          <span className='text-orenda-purple'>*</span>
        </h3>
        <Input
          hiddenLabel
          name='current_medications'
          multiline
          rows={2}
          variant='outlined'
        />
      </div>

      <div>
        <h3 className='label'>
          Please list any medication allergies.&nbsp;
          <span className='text-orenda-purple'>*</span>
        </h3>
        <Input
          hiddenLabel
          name='medication_allergies'
          multiline
          rows={2}
          variant='outlined'
        />
      </div>

      <div>
        <h3 className='label'>
          How often do you consume alcoholic beverages?&nbsp;
          <span className='text-orenda-purple'>*</span>
        </h3>
        <div className='grid gap-3 sm:grid-cols-2'>
          <Radios
            name='alcohol_frequency'
            options={[
              'Never',
              'Rarely (less than once a month)',
              'Occasionally (1-4 times per month)',
              'Frequently (2-4 times per week)',
              'Daily or almost daily',
            ]}
          />
        </div>
      </div>

      <div>
        <h3 className='label'>
          If applicable, how many drinks do you typically have in one sitting?
          &nbsp;
          <span className='text-orenda-purple'>*</span>
        </h3>
        <Input hiddenLabel name='alcohol_quantity' />
      </div>

      <div>
        <h3 className='label'>
          Do you use recreational drugs? If so, describe type, amount and
          frequency.&nbsp;
          <span className='text-orenda-purple'>*</span>
        </h3>
        <Input
          hiddenLabel
          name='drug_use'
          multiline
          rows={2}
          variant='outlined'
        />
      </div>

      <div>
        <h3 className='label'>
          Have you ever been hospitalized for a psychiatric issue?&nbsp;
          <span className='text-orenda-purple'>*</span>
        </h3>
        <div className='flex items-center ~gap-5/7'>
          <Radios name='hospitalized_psych' options={['Yes', 'No']} />
        </div>
        {beenHospitalized && (
          <Input
            name='hospitalized_psych_details'
            label='Please provide detail'
            required={beenHospitalized}
          />
        )}
      </div>

      <div>
        <h3 className='label'>
          Is there a history of mental illness in your family? If so, provide
          additional information.&nbsp;
          <span className='text-orenda-purple'>*</span>
        </h3>
        <Input
          hiddenLabel
          name='family_history_mental_illness'
          multiline
          rows={2}
          variant='outlined'
        />
      </div>

      <div>
        <h3 className='label'>
          Personal medical history; please check all that apply
        </h3>
        <div className='mb-3 grid sm:grid-cols-2'>
          <Checkboxes
            name='personal_medical_history'
            options={[
              'None apply',
              'Kidney problems',
              'Liver problems',
              'Seizure disorder or epilepsy',
              'Family history of QT prolongation',
              'Glaucoma',
              'Asthma',
              'Diabetes',
              'High blood pressure',
              'High cholesterol',
              'Heart disease',
              'HIV',
              'Cancer or history of cancer',
              'Thyroid or hormone condition',
              'Migraine headaches',
              'Headaches',
              'Head trauma/loss of consciousness/Traumatic brain injury',
              'Other',
            ]}
          />
        </div>

        {hasOtherMedical && (
          <Input
            label='Other? Please specify'
            name='medical_other'
            required={hasOtherMedical}
          />
        )}
      </div>

      <Input label='What is your current height?' name='height' />

      <Input label='What is your current weight?' name='weight' />

      <div>
        <h3 className='label'>
          Are you pregnant or breastfeeding?&nbsp;
          <span className='text-orenda-purple'>*</span>
        </h3>
        <div className='flex items-center ~gap-5/7'>
          <Radios name='pregnant_or_breastfeeding' options={['Yes', 'No']} />
        </div>
      </div>

      <div>
        <h3 className='label'>
          Have you had a physical in the last two years?&nbsp;
          <span className='text-orenda-purple'>*</span>
        </h3>
        <div className='grid gap-3 sm:grid-cols-2'>
          <Radios
            name='recent_physical_exam'
            options={[
              'Yes, all results were normal',
              'Yes, and there were abnormal results',
              'No',
            ]}
          />
        </div>
        {hasAbnormalResults && (
          <Input
            name='physical_exam_details'
            label='If abnormal results please describe'
            required={hasAbnormalResults}
          />
        )}
      </div>

      <div>
        <h3 className='label'>
          If you are in a relationship, please describe the nature of the
          relationship and months or years together.&nbsp;
          <span className='text-orenda-purple'>*</span>
        </h3>
        <Input
          hiddenLabel
          name='relationship_details'
          multiline
          rows={2}
          variant='outlined'
        />
      </div>

      <div>
        <h3 className='label'>
          What is your level of education? Highest grade/degree and type of
          degree.&nbsp;
          <span className='text-orenda-purple'>*</span>
        </h3>
        <Input
          hiddenLabel
          name='education_level'
          multiline
          rows={2}
          variant='outlined'
        />
      </div>

      <div>
        <h3 className='label'>
          What is your current occupation? What do you do? How long have you
          been doing it?&nbsp;
          <span className='text-orenda-purple'>*</span>
        </h3>
        <Input
          hiddenLabel
          name='current_occupation'
          multiline
          rows={2}
          variant='outlined'
        />
      </div>

      <div>
        <h3 className='label'>
          Describe your current living situation. Do you live alone, with
          others, with family, etc…&nbsp;
          <span className='text-orenda-purple'>*</span>
        </h3>
        <Input
          hiddenLabel
          name='living_situation'
          multiline
          rows={2}
          variant='outlined'
        />
      </div>

      <div>
        <h3 className='label'>
          Do you have any weapons or guns at home?&nbsp;
          <span className='text-orenda-purple'>*</span>
        </h3>
        <div className='flex items-center ~gap-5/7'>
          <Radios name='has_weapons' options={['Yes', 'No']} />
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
          <Radios name='suicidal_thoughts' options={['Yes', 'No']} />
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
            name='hearing_impairment'
            options={[
              'No, I do not have any hearing impairments.',
              'Yes, I have a hearing impairment that does require accommodations.',
            ]}
            required={true}
          />
        </div>

        {hasHearingImpairment && (
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
              name='interpreter_guidelines'
              className='mt-2'
              errorMsg='This field is required'
              registerOptions={{
                shouldUnregister: true,
              }}
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
        <Input hiddenLabel name='emergency_contact_info' />
      </div>

      <IMask
        label='Emergency Contact Phone Number'
        name='emergency_contact_phone'
        type='tel'
        mask='(999) 999-9999'
        required={true}
      />

      <p className='label !~mt-12/16'>
        By clicking on the checkbox and signing below, I hereby certify that I
        have answered all questions completely and truthfully to the best of my
        knowledge
      </p>

      <AgreementCheckbox
        name='honesty'
        label='I answered all questions truthfully'
      />
      <SignatureMaker name='honesty_signature' />
    </section>
  );
};
export default MentalHealth;
