import IMask from '@/components/ui/imask';
import Input from '@/components/ui/input';
import Radios from '@/components/ui/radios';
import AgreementCheckbox from '@/components/ui/agreement-checkbox';
import Checkboxes from '../ui/checkboxes';
import SignaturePad from '../ui/signature';

const MentalHealth = () => {
  return (
    <section className='fieldset-section'>
      <Input
        containerClassName='~mt-5/7'
        customLabel='What brings you to Orenda Psychiatry at this time? Is there something specific, such as a particular event?'
        hiddenLabel
        name='reason_for_visit'
        multiline
        rows={2}
        variant='outlined'
      />

      <Radios
        containerClassName='my-7'
        label={
          <>
            What would you like your sessions to focus on?{' '}
            <small>(Select one answer)</small>
          </>
        }
        name='mental_health_care_type'
        options={[
          'Medication Management (with brief talk therapy)',
          'Weekly/Bi-weekly Talk Therapy only',
        ]}
        showHiddenSectionValue={1}
        hiddenSection={
          <Radios
            label={
              <span className='text-sm text-gray-700'>
                Please note that not all our providers offer therapy services at
                this time, and the first available therapy appointment might be
                a few days out.
              </span>
            }
            name='therapy_availability'
            errorMsg='This field is required'
            options={['I understand', 'I need to see someone immediately']}
            registerOptions={{
              shouldUnregister: true,
            }}
          />
        }
      />

      <Radios
        label='Have you seen a mental health professional before?'
        name='seen_health_professional'
        className='grid grid-cols-2 gap-3'
        options={[
          'Yes, for therapy only.',
          'Yes, a psychiatrist or psychiatric NP for medication management.',
          'I have experience with both therapy and psychotropic medication.',
          'No, this is my first encounter with a mental health professional.',
        ]}
      />

      <Checkboxes
        label='Please check any of the following you have experienced in the past six
          months'
        name='symptoms_past_six_months'
        className='mb-3'
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
        otherName='symptoms_other'
      />

      <Input
        customLabel='Please list all prescription medications and supplements you take or
          note "none".'
        hiddenLabel
        name='current_medications'
        multiline
        rows={2}
        variant='outlined'
      />

      <Input
        customLabel='Please list any medication allergies (If none, please indicate)'
        hiddenLabel
        name='medication_allergies'
        multiline
        rows={2}
        variant='outlined'
      />

      <Radios
        label='How often do you consume alcoholic beverages?'
        name='alcohol_frequency'
        options={[
          'Never',
          'Rarely (less than once a month)',
          'Occasionally (1-4 times per month)',
          'Frequently (2-4 times per week)',
          'Daily or almost daily',
        ]}
      />

      <Input
        customLabel='If applicable, how many drinks do you typically have in one sitting?'
        hiddenLabel
        name='alcohol_quantity'
      />

      <Input
        customLabel='Do you use recreational drugs? If so, describe type, amount and
          frequency.'
        hiddenLabel
        name='recreational_drug_use'
        multiline
        rows={2}
        variant='outlined'
      />

      <Radios
        label='Have you ever been hospitalized for a psychiatric issue?'
        name='hospitalized_psych'
        options={['Yes', 'No']}
        showHiddenSectionValue={0}
        grid={false}
        hiddenSection={
          <Input
            name='hospitalized_psych_details'
            label='Please provide detail'
            className='mt-5'
          />
        }
      />

      <Radios
        label='Is there a history of mental illness in your family?'
        name='family_history_mental_illness'
        options={['Yes', 'No']}
        grid={false}
      />

      <Checkboxes
        className='mb-3'
        label='Personal medical history; please check all that apply'
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

      <Input label='What is your current height?' name='height' />

      <Input label='What is your current weight?' name='weight' />

      <Radios
        label='Are you pregnant or breastfeeding?'
        name='pregnant_or_breastfeeding'
        options={['Yes', 'No']}
        grid={false}
      />

      <Radios
        label='Have you had a physical in the last two years?'
        name='recent_physical_exam'
        options={[
          'Yes, all results were normal',
          'Yes, and there were abnormal results',
          'No',
        ]}
        showHiddenSectionValue={1}
        hiddenSection={
          <>
            <Input
              label='If abnormal results please describe'
              name='recent_physical_exam_details'
            />
          </>
        }
      />

      <Radios
        label='Relationship status:'
        name='relationship_status'
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

      <Input
        customLabel='What is your highest level of education?'
        hiddenLabel
        name='education_level'
        multiline
        rows={2}
        variant='outlined'
      />

      <Input
        customLabel='What is your current occupation?'
        hiddenLabel
        name='current_occupation'
        multiline
        rows={2}
        variant='outlined'
      />

      <Input
        customLabel='Describe your current living situation. Do you live alone, with others, with family, etc…'
        hiddenLabel
        name='living_situation'
        multiline
        rows={2}
        variant='outlined'
      />

      <Radios
        label='Do you have any weapons or guns at home?'
        grid={false}
        name='has_weapons'
        options={['Yes', 'No']}
      />

      <Radios
        containerClassName='pt-5'
        label='Have you ever had suicidal thoughts?'
        name='suicidal_thoughts'
        grid={false}
        options={['Yes', 'No']}
        showHiddenSectionValue='Yes'
        hiddenSection={
          <Radios
            label={
              <em className='mb-4 inline-block'>
                If you are actively having suicidal thoughts and have a plan to
                harm yourself, please call <a href='tel:911'>911</a>{' '}
                immediately.
              </em>
            }
            name='suicidal_thoughts_details'
            showRequiredMark={false}
            options={[
              'Yes, I’ve had passive thoughts (e.g., wishing I were dead or not waking up) but no plan or intent.',
              ' Yes, I’ve had active thoughts about suicide but no plan or intent to act on them.',
              'Yes, I’ve had active thoughts with a plan, but no intent to act.',
              ' Yes, I’ve had active thoughts with a plan and intent to act.',
            ]}
          />
        }
      />

      <Radios
        label='Do you have any hearing impairments that would affect your participation in sessions or require accommodations?'
        name='hearing_impairment'
        options={[
          'No, I do not have any hearing impairments.',
          'Yes, I have a hearing impairment that does require accommodations.',
        ]}
        required={true}
        showHiddenSectionValue={1}
        hiddenSection={
          <>
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
          </>
        }
      />

      <Input
        customLabel="Who would you like us to contact in the event of an emergency? What is this person's relationship to you?"
        hiddenLabel
        name='emergency_contact_info'
      />

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
