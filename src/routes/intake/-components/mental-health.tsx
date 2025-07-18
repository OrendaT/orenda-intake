import IMask from '@/components/ui/imask';
import Input from '@/components/ui/input';
import Radios from '@/components/ui/radios';
import AgreementCheckbox from '@/components/ui/agreement-checkbox';
import Checkboxes from '../../../components/ui/checkboxes';
import SignaturePad from '../../../components/ui/signature';
import { YES_NO } from '@/lib/constants';

const MentalHealth = () => {
  return (
    <fieldset className='fieldset'>
      <Input
        containerClassName='clamp-[mt,5,6]'
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
          { value: 'Medication Management (with brief talk therapy)' },
          { value: 'Weekly/Bi-weekly Talk Therapy only' },
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
            options={[
              { value: 'I understand' },
              { value: 'I need to see someone immediately' },
            ]}
            registerOptions={{
              shouldUnregister: true,
            }}
          />
        }
      />

      <Radios
        label='Have you seen a mental health professional before?'
        name='seen_health_professional'
        options={[
          { value: 'Yes, for therapy only.' },
          {
            value:
              'Yes, a psychiatrist or psychiatric NP for medication management.',
          },
          {
            value:
              'I have experience with both therapy and psychotropic medication.',
          },
          {
            value:
              'No, this is my first encounter with a mental health professional.',
          },
        ]}
      />

      <Checkboxes
        label='Please check any of the following you have experienced in the past six
          months'
        name='symptoms_past_six_months'
        className='mb-3'
        options={[
          { value: 'Increased appetite' },
          { value: 'Decreased appetite' },
          { value: 'Trouble concentrating' },
          { value: 'Difficulty sleeping' },
          { value: 'Excessive sleep' },
          { value: 'Low motivation' },
          { value: 'Isolation from others' },
          { value: 'Fatigue/low energy' },
          { value: 'Low self-esteem' },
          { value: 'Depressed mood' },
          { value: 'Tearful or crying spells' },
          { value: 'Anxiety' },
          { value: 'Fear' },
          { value: 'Hopelessness' },
          { value: 'Panic' },
          { value: 'Self Harm' },
          { value: 'Thoughts/urges to harm others' },
          { value: 'None Apply' },
          { value: 'Other' },
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
          { value: 'Never' },
          { value: 'Rarely (less than once a month)' },
          { value: 'Occasionally (1-4 times per month)' },
          { value: 'Frequently (2-4 times per week)' },
          { value: 'Daily or almost daily' },
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
        options={YES_NO}
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
        options={YES_NO}
        grid={false}
      />

      <Checkboxes
        className='mb-3'
        label='Personal medical history; please check all that apply'
        name='personal_medical_history'
        options={[
          { value: 'None apply' },
          { value: 'Kidney problems' },
          { value: 'Liver problems' },
          { value: 'Seizure disorder or epilepsy' },
          { value: 'Family history of QT prolongation' },
          { value: 'Glaucoma' },
          { value: 'Asthma' },
          { value: 'Diabetes' },
          { value: 'High blood pressure' },
          { value: 'High cholesterol' },
          { value: 'Heart disease' },
          { value: 'HIV' },
          { value: 'Cancer or history of cancer' },
          { value: 'Thyroid or hormone condition' },
          { value: 'Migraine headaches' },
          { value: 'Headaches' },
          { value: 'Head trauma/loss of consciousness/Traumatic brain injury' },
          { value: 'Other' },
        ]}
      />

      <Input label='What is your current height?' name='height' />

      <Input label='What is your current weight?' name='weight' />

      <Radios
        label='Are you pregnant or breastfeeding?'
        name='pregnant_or_breastfeeding'
        options={YES_NO}
        grid={false}
      />

      <Radios
        label='Have you had a physical in the last two years?'
        name='recent_physical_exam'
        options={[
          { value: 'Yes, all results were normal' },
          { value: 'Yes, and there were abnormal results' },
          { value: 'No' },
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
          { value: 'Single' },
          { value: 'Dating' },
          { value: 'Married' },
          { value: 'Other committed relationship' },
          { value: 'Separated/divorced' },
          { value: 'Widowed' },
          { value: 'Other' },
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
        options={YES_NO}
      />

      <Radios
        label='Do you have any hearing impairments that would affect your participation in sessions or require accommodations?'
        name='hearing_impairment'
        options={[
          { value: 'No, I do not have any hearing impairments.' },
          {
            value:
              'Yes, I have a hearing impairment that does require accommodations.',
          },
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

      <div className='pt-5'>
        <p className='label mb-3 text-[0.95rem]'>
          By clicking on the checkbox and signing below, I hereby certify that I
          have answered all questions completely and truthfully to the best of
          my knowledge
        </p>

        <AgreementCheckbox
          name='honesty'
          label='I answered all questions truthfully'
        />
        <SignaturePad name='honesty_signature' />
      </div>
    </fieldset>
  );
};
export default MentalHealth;
