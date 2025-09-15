import { FORMS, US_STATES } from '@/lib/constants';
import type { NamePath } from './inputs';

export type ValidatorType = 'string' | 'email' | 'date' | 'array';
// validator types
export type FieldConfig = {
  key: NamePath;
  type: ValidatorType;
  noSend?: boolean;
};

export type FormType = keyof typeof FORMS;

// ---------- Intake Form ----------
export type IntakeFormData = {
  first_name: string;
  last_name: string;
  preferred_name: string;

  preferred_pronouns: string;
  preferred_pronouns_other?: string;

  date_of_birth: string;
  phone: string;
  email: string;
  for_minor_child: string;
  guardian_name: string;
  guardian_signature: string;
  relationship_with_child: string;
  sex_assigned_at_birth: string;
  gender: string;

  address_one: string;
  address_two: string;
  city: string;
  state: string;
  zip_code: string;
  reason_for_visit: string;
  mental_health_care_type: string;
  therapy_availability: string;
  hearing_impairment: string;
  interpreter_guidelines: string;
  emergency_contact_info: string;
  emergency_contact_phone: string;
  insurance_id: string;
  insurance_card_front: string;
  insurance_card_back: string;
  credit_card_number: string;
  credit_card_exp_date: string;
  credit_card_csv: string;
  billing_zip_code: string;

  // New fields
  seen_health_professional: string;
  symptoms_past_six_months: string[];
  symptoms_other: string;
  current_medications: string;
  medication_allergies: string;
  alcohol_frequency: string;
  alcohol_quantity: string;
  recreational_drug_use: string;
  hospitalized_psych: string;
  hospitalized_psych_details: string;
  family_history_mental_illness: string;
  personal_medical_history: string[];
  personal_medical_history_other: string;
  height: string;
  weight: string;
  pregnant_or_breastfeeding: string;
  recent_physical_exam: string;
  recent_physical_exam_details: string;
  education_level: string;
  current_occupation: string;
  living_situation: string;
  has_weapons: string;
  honesty: string;
  honesty_signature: string;

  policy_agreement: string;
  policy_agreement_signature: string;

  relationship_status: string;
  relationship_status_other?: string;

  appointment_address: string;
  appointment_city: string;
  appointment_state: string;
  appointment_street_address: string;
  appointment_zip_code: string;
  photo_ID: string;

  insurance_provider: string;

  race: string;
  race_other?: string;
};

// ---------- Credit Card Form ----------
export type CreditCardFormData = {
  patient_name: string;
  date_of_birth: string;
  cardholder_name: string;

  address_one: string;
  address_two: string;
  city: string;
  state: string;
  zip_code: string;

  credit_card_number: string;
  credit_card_exp_date: string;
  credit_card_csv: string;

  signature: string;
  signature_date: string | Date;
};

// ---------- Provider Onboarding Form ----------

export type StateCode = (typeof US_STATES)[number]['code'];
type LicenseField =
  | 'collaborating_physician'
  | 'collaborating_physician_name'
  | 'collaborating_physician_npi'
  | 'collaborating_physician_email'
  | 'collaborating_physician_phone'
  | 'state_license_doc'
  | 'has_DEA'
  | 'DEA_state_number'
  | 'DEA_state_doc'
  | 'form_4NP_doc';

export type NursingDegree = 'BSN' | 'MSN' | 'DNP';
type NursingDegreeField = 'institution' | 'start_date' | 'end_date';

export type LicenseSummaryField = 'license' | 'DEA' | 'practice_ind';

export type OnboardingFormData = {
  name: string;
  email: string;
  all_names_used: string;
  date_of_birth: string;
  social_security_number: string;
  street_address: string;
  address_two: string;
  city: string;
  state: string;
  zip_code: string;
  residence: string;

  CAQH_number: string;
  CAQH_username: string;
  CAQH_password: string;

  NPI_number: string;
  professional_statement: string;
  headshot_1: string;
  headshot_2: string;

  referral_source: string;
  referral_source_detail: string;

  consent_create_pecos_account: string;
  PECOS_username: string;
  PECOS_password: string;
  NPPES_username: string;
  NPPES_password: string;
  PTAN_medicare_ID: string;

  pmhnp_bc_doc: string;
  has_additional_qualifications: string;
  additional_qualifications: string[];
  additional_qualifications_doc: string;

  malpractice_insurance_doc: string;
  resume_cv_doc: string;

  highest_nursing_degree: string;
  highest_nursing_degree_other: string;
  highest_nursing_degree_start_date: string;
  highest_nursing_degree_end_date: string;
  highest_nursing_degree_school: string;

  COI_coverage: string;
  COI_coverage_doc: string;

  photo_ID: string;
  proof_of_address_ID: string;
  patient_age_groups: string[];

  health_specialties: string[];
  health_conditions: string[];

  speaks_additional_lang: string;
  additional_langs: string[];
  additional_langs_other?: string;

  ketamine_assisted_therapy: string;
  ketamine_assisted_therapy_more_info: string;

  race_ethnicity: string;
  race_ethnicity_other?: string;

  therapy_preference_response: string;
  therapy_policy_acknowledgement: string;

  identity_details: string;
  policy_agreement: string;
  policy_agreement_signature: string;

  states_of_license: string[];

  nursing_degrees: string[];
  clinical_experience_level: string;
} & {
  [K in `states_of_license__${StateCode}__${LicenseField}`]?: string;
} & {
  [K in `states_of_license_summary__${StateCode}__${LicenseSummaryField}`]?: string;
} & {
  [K in `nursing_degrees_${NursingDegree}_${NursingDegreeField}`]?: string;
} & {
  [K in `health_conditions[${number}]`]?: string;
};

export type FormData = IntakeFormData | CreditCardFormData | OnboardingFormData;
