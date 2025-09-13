export const patientsAgeGroups = [
  { value: 'Children (5+ yrs)' },
  { value: 'Teens (13-17 yrs)' },
  { value: 'Adult (18-64 yrs)' },
  { value: 'Seniors (65+ yrs)' },
];

export const mentalHealthIssues = [
  { value: 'Adjustment Disorder' },
  { value: 'Anger Management' },
  { value: 'Autism Spectrum Disorders (ASD)' },
  { value: 'Bipolar Disorder' },
  { value: 'Body Image' },
  { value: 'CBT' },
  { value: 'Chronic Pain' },
  { value: 'Couples' },
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
  { value: 'Depression', readonly: true },
  { value: 'Anxiety', readonly: true },
  { value: 'ADHD', readonly: true },
];

export const mentalHealthSpecializations = [
  { value: "Men's Health" },
  { value: 'Weight Management' },
  { value: 'Couples' },
  { value: 'Eating Disorders' },
  { value: 'Fertility' },
  { value: "Women's Health" },
  { value: 'LGBTQ' },
  { value: 'Gender Affirming Care' },
  { value: 'Substance Use Disorder (SUD)' },
  { value: 'Autism Spectrum Disorders (ASD)' },
  { value: 'MAT / Suboxone' },
];

export const treatmentApproaches = [
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

export const experienceLevels = [
  {
    label: (
      <>
        <strong className='font-medium'>Beginner / Limited Experience</strong> –
        Newly licensed or in early training, minimal independent practice.
      </>
    ),
    value:
      'Beginner / Limited Experience – Newly licensed or in early training, minimal independent practice.',
  },
  {
    label: (
      <>
        <strong className='font-medium'>Intermediate</strong> – Some independent
        clinical experience, still building confidence and expertise.
      </>
    ),
    value:
      'Intermediate – Some independent clinical experience, still building confidence and expertise.',
  },
  {
    label: (
      <>
        <strong className='font-medium'>Experienced</strong> – Several years of
        practice, comfortable managing a wide range of clinical situations.
      </>
    ),
    value:
      'Experienced – Several years of practice, comfortable managing a wide range of clinical situations.',
  },
  {
    label: (
      <>
        <strong className='font-medium'>Expert / Highly Experienced</strong> –
        Extensive practice history, advanced clinical skills, often supervising
        or mentoring others.
      </>
    ),
    value:
      'Expert / Highly Experienced – Extensive practice history, advanced clinical skills, often supervising or mentoring others.',
  },
];
