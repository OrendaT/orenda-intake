import Checkboxes from '@/components/ui/checkboxes';
import Input from '@/components/ui/input';
import Radios from '@/components/ui/radios';
import SelectCheckboxes from '@/components/ui/select-checkboxes';
import { YES_NO } from '@/lib/constants';

const patientsAgeRange = [
  { value: 'Children (5+ yrs)' },
  { value: 'Teens (13-17 yrs)' },
  { value: 'Adult (18-64 yrs)' },
  { value: 'Seniors (65+ yrs)' },
];

const followUpAppointmentLengths = [
  { value: '15 - 20 minutes' },
  { value: '20 - 25 minutes' },
  { value: '25 - 30 minutes' },
];

const therapyOnlySessions = [
  { value: 'Couples therapy' },
  { value: 'Talk Therapy' },
  { value: 'Do not currently offer therapy only sessions' },
  { value: 'Others' },
];

const specializations = [
  { value: 'Substance Use Disorder (SUD)' },
  { value: 'Medication Assisted Treatment (MAT)' },
  { value: 'Geripsych' },
  { value: 'Autism Spectrum Disorder (ASD)' },
  { value: 'Eating Disorder(s)' },
  { value: 'Gender Affirming Care' },
  { value: 'Chronic Pain' },
  { value: 'Tics/Tourette Syndrome' },
  { value: 'Genomic Testing' },
  { value: 'Maternity / Post Partum' },
  { value: 'Bipolar Disorder' },
  { value: 'Personality Disorder(s)' },
  { value: 'Others' },
];

const languages = [
  { value: 'Russian' },
  { value: 'Bengali' },
  { value: 'Cantonese' },
  { value: 'Mandarin' },
  { value: 'Uzbek' },
  { value: 'Tagalog' },
  { value: 'Spanish' },
  { value: 'Yoruba' },
  { value: 'French (Creole)' },
  { value: 'Portuguese' },
  { value: 'None' },
  { value: 'Others' },
];

const ethnicities = [
  { value: 'Asian' },
  { value: 'Black / African American' },
  { value: 'Hispanic / LatinX' },
  { value: 'Indigenous American / Alaskan' },
  { value: 'Native Hawaiin / Other Pacific Islander' },
  { value: 'White' },
  { value: 'Middle Eastern' },
  { value: 'Prefer not to say' },
  { value: 'Others' },
];

const treatmentApproaches = [
  {
    value:
      'I would be glad to add this patient to my caseload and work with them indefinitely',
  },
  {
    value:
      'I would be glad to provide 6 - 10 therapy sessions but if we decide they do not want medication, I will explain that they need to find an LCSW',
  },
  { value: 'I will only provide combined medication with therapy' },
];

const Part2 = () => {
  return (
    <div className='form-part'>
      <h2 className='legend clamp-[mb,2,4]'>Part 2: Provider Questionnaire</h2>

      <p className='mx-auto mb-12 max-w-lg text-center'>
        Share information about your specialties and professional background.
        This will be used for marketing purposes to highlight your expertise and
        ensure you are represented accurately in our materials.
      </p>
      <p className='mx-auto mb-12 max-w-md text-center'>
        <strong>Disclaimer:</strong> Our advertising reflects the service
        offerings provided in this questionnaire/form. If you need to modify
        these offerings at any time, please inform us by sending the updated
        details to credentialing@orendapsych.com
      </p>

      <fieldset className='fieldset'>
        <Radios
          label='What age of patients do you see?'
          name='patients_age_range'
          options={patientsAgeRange}
        />
      </fieldset>

      <fieldset className='fieldset'>
        <Radios
          label='How long are your follow up appointments?'
          name='follow_up_appointment_length'
          options={followUpAppointmentLengths}
        />
      </fieldset>

      <fieldset className='fieldset'>
        <Checkboxes
          label='What type of therapy only sessions do you offer?'
          name='therapy_only_sessions'
          options={therapyOnlySessions}
        />
      </fieldset>

      <fieldset className='fieldset'>
        <SelectCheckboxes
          label='What focus areas do you want advertised as specializing in?'
          name='focus_areas'
          options={specializations}
        />
      </fieldset>

      <fieldset className='fieldset'>
        <SelectCheckboxes
          label='What languages do you speak (other than English)?'
          name='language'
          options={languages}
        />
      </fieldset>

      <fieldset className='fieldset'>
        <Radios
          label='Are you interested in providing Ketamine-Assisted Therapy? (We collaborate with Wondermed and Minbloom, two leading providers in the psychedelic space. We offer support through training, additional insurance, and other resources related to ketamine treatment)'
          name='ketamine_assisted_therapy'
          options={[
            ...YES_NO,
            { value: 'I need more information before making a decision.' },
          ]}
          showHiddenSectionValue={2}
          hiddenSection={<Input label='Please explain' name='ketamine_other' />}
        />
      </fieldset>

      <fieldset className='fieldset'>
        <Radios
          label='To help us tailor our marketing efforts and better represent the diversity of our providers, please indicate your race or ethnicity. Please note that this is entirely optional. (Note: This is used for advertising purposes to match providers with patients. If you are uncomfortable disclosing this information select "prefer not to say")'
          name='race_ethnicity'
          options={ethnicities}
          showHiddenSectionValue='Others'
          hiddenSection={
            <Input label='Please specify' name='race_ethnicity_other' />
          }
        />
      </fieldset>

      <fieldset className='fieldset'>
        <Radios
          label='In an instance where a patient wants to book with you for weekly, or bi-weekly talk therapy sessions, but they are either not interested or uncertain about taking any psychotropic medication, how would you respond? Please keep in mind that psychiatric NPs can and do provide therapy.'
          name='weekly_talk_therapy'
          options={treatmentApproaches}
          className='sm:grid-cols-1'
        />
      </fieldset>

      <fieldset className='fieldset gap-0'>
        <h3 className='heading mb-2 text-left'>
          Please acknowledge the following:
        </h3>
        <p className='mb-1'>
          If you decide to stop accepting therapy-only patients at any point,
          it’s important that you:
        </p>

        <ul className='mb-4 list-disc space-y-2 ps-5'>
          <li>
            <strong>Inform</strong> the <strong>admin team</strong> to update
            scheduling and intake procedures.
          </li>
          <li>
            <strong>Notify</strong> current therapy <strong>patients</strong> to
            ensure a smooth transition to another provider or therapist.
          </li>
          <li>
            Clearly <strong>communicate</strong> to new{' '}
            <strong>patients</strong> the potential for{' '}
            <strong>referrals</strong> if they are{' '}
            <strong>only seeking therapy</strong>.
          </li>
        </ul>

        <Radios
          label='Do you acknowledge and agree to follow these steps?'
          name='acknowledge_steps'
          options={YES_NO}
        />
      </fieldset>

      <fieldset className='fieldset'>
        <h3 className='heading text-left'>
          OPTIONAL: Some clients are looking for providers they can relate to.
          If you wish to do so, you can share more details about your identity
          such as gender, sexuality, and faith. This information will be
          highlighted on your profile (please note this is optional).
        </h3>

        <Input label='Response' name='optional_info' />
      </fieldset>
    </div>
  );
};
export default Part2;
