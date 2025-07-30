import Radios from '@/components/ui/radios';
import SelectCheckboxes from '@/components/ui/select-checkboxes';

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

const mentalHealthIssues = [
  { value: 'ADHD' },
  { value: 'Adjustment Disorder' },
  { value: 'Anger Management' },
  { value: 'Anxiety' },
  { value: 'Autism' },
  { value: 'Autism Spectrum Disorders (ASD)' },
  { value: 'Bipolar Disorder' },
  { value: 'Body Image' },
  { value: 'CBT' },
  { value: 'Chronic Pain' },
  { value: 'Couples' },
  { value: 'Depression' },
  { value: 'Eating Disorders' },
  { value: 'Family Trauma' },
  { value: 'Gender Affirming Care' },
  { value: 'Generalized Anxiety Disorder (GAD)' },
  { value: 'Genomic Testing' },
  { value: 'Group Therapy' },
  { value: 'Infertility/Fertility Challenges' },
  { value: 'Insomnia' },
  { value: 'Issues with Self Esteem' },
  { value: 'Life Transitions in Young Adulthood' },
  { value: 'Major Depressive Disorder (MDD)' },
  { value: 'Medication-Assisted Treatment' },
  { value: 'Menopause' },
  { value: "Men's Health" },
  { value: 'Mood Disorders' },
  { value: 'Oppositional Defiant Disorder' },
  { value: 'Panic Disorders (DOS)' },
  { value: 'LGBTQ+ Care' },
  { value: 'Post-Partum Depression (PPD)' },
  { value: 'Premenstrual Dysphoric Disorder (PDD)' },
  { value: 'Psychosis' },
  { value: 'Psychotherapy' },
  { value: 'PTSD' },
  { value: 'Relationships' },
  { value: 'Schizophrenia' },
  { value: 'Sleep Disorders' },
  { value: 'Social Anxiety' },
  { value: 'Stress Related' },
  { value: 'Substance Use Disorder (SUD)' },
  { value: 'Trauma' },
  { value: 'Weight Management' },
  { value: "Women's Health" },
];

const mentalHealthSpecializations = [
  { value: 'ADHD' },
  { value: 'Anger Management' },
  { value: 'Couples' },
  { value: 'Eating Disorders' },
  { value: 'Group Therapy' },
  { value: 'LGBTQ+ Care' },
  { value: 'Premenstrual Dysphoric Disorder (PDD)' },
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
        <SelectCheckboxes
          label='What mental health issues do you provide care for? (select all that apply)'
          name='mental_health_issues'
          options={mentalHealthIssues}
        />

        <hr className='border-[#B2B2B2] mt-5' />

        <SelectCheckboxes
          label='Please select which of these you would like to specialize in for marketing purposes'
          name='mental_health_issues_specialization'
          options={mentalHealthSpecializations}
        />
      </fieldset>
    </div>
  );
};
export default Part2;
