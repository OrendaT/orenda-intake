import type {
  CreditCardFormData,
  IntakeFormData,
  LicenseDea,
  OnboardingFormData,
} from '@/types';

export const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const intakeInitialValues: IntakeFormData = {
  first_name: '',
  last_name: '',
  preferred_name: '',
  date_of_birth: '',
  phone: '',
  email: '',
  for_minor_child: '',
  guardian_name: '',
  guardian_signature: '',
  relationship_with_child: '',
  sex_assigned_at_birth: '',
  gender: '',
  address_one: '',
  address_two: '',
  city: '',
  state: '',
  zip_code: '',
  reason_for_visit: '',
  mental_health_care_type: '',
  therapy_availability: '',
  hearing_impairment: '',
  interpreter_guidelines: '',
  emergency_contact_info: '',
  emergency_contact_phone: '',
  insurance_id: '',
  insurance_card_front: '',
  insurance_card_back: '',
  credit_card_number: '',
  credit_card_exp_date: '',
  credit_card_csv: '',
  billing_zip_code: '',

  // New fields
  seen_health_professional: '',
  symptoms_past_six_months: [],
  symptoms_other: '',
  current_medications: '',
  medication_allergies: '',
  alcohol_frequency: '',
  alcohol_quantity: '',
  recreational_drug_use: '',
  hospitalized_psych: '',
  hospitalized_psych_details: '',
  family_history_mental_illness: '',
  personal_medical_history: [],
  personal_medical_history_other: '',
  height: '',
  weight: '',
  pregnant_or_breastfeeding: '',
  recent_physical_exam: '',
  recent_physical_exam_details: '',
  education_level: '',
  current_occupation: '',
  living_situation: '',
  has_weapons: '',
  honesty: '',
  honesty_signature: '',

  policy_agreement: '',
  policy_agreement_signature: '',

  relationship_status: '',
  relationship_status_other: '',
  appointment_address: '',
  appointment_city: '',
  appointment_state: '',
  photo_ID: '',

  insurance_provider: '',

  race: '',
  race_other: '',
  preferred_pronouns: '',

  appointment_street_address: '',
  appointment_zip_code: '',
};

export const creditCardInitialValues: CreditCardFormData = {
  patient_name: '',
  date_of_birth: '',
  cardholder_name: '',

  address_one: '',
  address_two: '',
  city: '',
  state: '',
  zip_code: '',

  credit_card_number: '',
  credit_card_exp_date: '',
  credit_card_csv: '',

  signature: '',
  signature_date: new Date(),
};

export const providerOnboardingInitialValues: OnboardingFormData = {
  name: '',
  email: '',
  all_names_used: '',
  date_of_birth: '',
  social_security_number: '',
  street_address: '',
  address_two: '',
  city: '',
  state: '',
  zip_code: '',
  residence: '',

  CAQH_number: '',
  CAQH_username: '',
  CAQH_password: '',

  NPI_number: '',
  professional_statement: '',
  headshot_1: '',
  headshot_2: '',

  referral_source: '',
  referral_source_detail: '',

  consent_create_pecos_account: '',
  PECOS_username: '',
  PECOS_password: '',
  NPPES_username: '',
  NPPES_password: '',
  PTAN_medicare_ID: '',

  pmhnp_bc_doc: '',
  has_additional_qualifications: '',
  additional_qualifications: [],
  additional_langs: [],
  additional_qualifications_doc: '',

  malpractice_insurance_doc: '',
  resume_cv_doc: '',

  highest_nursing_degree: '',
  highest_nursing_degree_other: '',
  highest_nursing_degree_start_date: '',
  highest_nursing_degree_end_date: '',
  highest_nursing_degree_school: '',

  COI_coverage: '',
  COI_coverage_doc: '',

  photo_ID: '',
  proof_of_address_ID: '',
  patient_age_groups: [],

  health_specialties: ['Depression', 'Anxiety', 'ADHD'],
  health_conditions: [],

  speaks_additional_lang: '',

  ketamine_assisted_therapy: '',
  ketamine_assisted_therapy_more_info: '',

  race_ethnicity: '',
  race_ethnicity_other: '',

  therapy_preference_response: '',
  therapy_policy_acknowledgement: '',

  identity_details: '',
  policy_agreement: '',
  policy_agreement_signature: '',

  states_of_license: [],
  nursing_degrees: [],
  clinical_experience_level: '',
};

export const LDStates: LicenseDea[] = [
  {
    name: 'NY',
  },
  {
    name: 'MA',
  },
  {
    name: 'CT',
  },
  {
    name: 'NJ',
  },
];
