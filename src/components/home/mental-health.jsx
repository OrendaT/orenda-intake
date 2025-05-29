import { useFormContext } from 'react-hook-form';
import IMask from '@/components/ui/imask';
import Input from '@/components/ui/input';
import Radios from '@/components/ui/radios';
import AgreementCheckbox from '@/components/ui/agreement-checkbox';
import Checkboxes from '../ui/checkboxes';
import SignaturePad from '../ui/signature';

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

  const relationship = watch('relationship_details');
  const hasRelationShipDetailsOther =
    Array.isArray(relationship) && relationship.includes('Other');

  const hasSuicidalThoughts = watch('suicidal_thoughts') === 'Yes';

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
            <div className='mt-4 hidden-section'>
              <p className='text-sm text-gray-700'>
                Please note that not all our providers offer therapy services at
                this time, and the first available therapy appointment might be
                a few days out.
              </p>

              <div className='grid grid-cols-2 mt-5'>
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
          months&nbsp;
          <span className='text-orenda-purple'>*</span>
        </h3>
        <div className='grid mb-3 sm:grid-cols-2'>
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
          Please list all prescription medications and supplements you take or
          note "none".&nbsp;
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
          Please list any medication allergies (If none, please indicate) &nbsp;
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
          name='recreational_drug_use'
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
            className='mt-5'
          />
        )}
      </div>

      <div>
        <h3 className='label'>
          Is there a history of mental illness in your family? &nbsp;
          <span className='text-orenda-purple'>*</span>
        </h3>
        <div className='flex items-center ~gap-5/7'>
          <Radios
            name='family_history_mental_illness'
            options={['Yes', 'No']}
          />
        </div>
      </div>

      <div>
        <h3 className='label'>
          Personal medical history; please check all that apply&nbsp;
          <span className='text-orenda-purple'>*</span>
        </h3>
        <div className='grid mb-3 sm:grid-cols-2'>
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
            name='personal_medical_history_other'
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
            name='recent_physical_exam_details'
            label='If abnormal results please describe'
            required={hasAbnormalResults}
          />
        )}
      </div>

      <div>
        <h3 className='label'>
          Relationship status:&nbsp;
          <span className='text-orenda-purple'>*</span>
        </h3>
        <div className='grid mb-3 sm:grid-cols-2'>
          <Radios
            name='relationship_details'
            options={[
              'Single',
              'Dating',
              'Married',
              'Other committed relationship',
              'Separated/divorced',
              'Widowed',
              'Other',
            ]}
          />
        </div>

        {hasRelationShipDetailsOther && (
          <Input
            label='Other? Please specify'
            name='relationship_details_other'
            required={hasRelationShipDetailsOther}
          />
        )}
      </div>

      <div>
        <h3 className='label'>
          What is your highest level of education?&nbsp;
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
          What is your current occupation?&nbsp;
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
          Have you ever had suicidal thoughts? &nbsp;
          <span className='text-orenda-purple'>*</span>
        </h3>
        <div className='flex items-center ~gap-5/7'>
          <Radios name='suicidal_thoughts' options={['Yes', 'No']} />
        </div>

        {hasSuicidalThoughts && (
          <div className='mt-5 bg-transparent hidden-section'>
            <p className='mb-4'>
              <em>
                If you are actively having suicidal thoughts and have a plan to
                harm yourself, please call <a href='tel:911'>911</a>{' '}
                immediately.
              </em>
            </p>

            <div className='grid gap-3 sm:grid-cols-2'>
              <Radios
                name='has_suicidal_thoughts_details'
                options={[
                  'Yes, I’ve had passive thoughts (e.g., wishing I were dead or not waking up) but no plan or intent.',
                  ' Yes, I’ve had active thoughts about suicide but no plan or intent to act on them.',
                  'Yes, I’ve had active thoughts with a plan, but no intent to act.',
                  ' Yes, I’ve had active thoughts with a plan and intent to act.',
                ]}
              />
            </div>
          </div>
        )}
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
          <div className='p-3 mt-4 bg-gray-100 border-l-4 border-gray-500 rounded'>
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
      <SignaturePad name='honesty_signature' />
    </section>
  );
};
export default MentalHealth;
