export const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const intakeInitialValues = {
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
};

export const creditCardInitialValues = {
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

export const providerOnboardingInitialValues = {
  name: '',
  email: '',
  date_of_birth: '',
  phone: '',
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

  primary_state_of_license: '',
  primary_state_of_license_details: '',

  collaborating_physician: '',
  collaborating_physician_name: '',
  collaborating_physician_npi: '',
  collaborating_physician_email: '',

  form_4NP_doc: '',
  consent_create_pecos_account: '',

  PECOS_username: '',
  PECOS_password: '',
  NPPES_username: '',
  NPPES_password: '',
  PTAN_medicare_ID: '',

  primary_state_license_doc: '',
  primary_state_dea_number: '',
  primary_state_dea_doc: '',

  has_additional_np_licenses: '',
  additional_np_licenses: [],
  additional_state_license_doc: '',
  has_additional_dea_registrations: '',
  additional_dea_reg: '',
  additional_dea_doc: '',

  pmhnp_bc_doc: '',
  has_additional_qualifications: '',
  additional_qualifications: [],
  additional_qualifications_doc: '',

  malpractice_insurance_doc: '',
  resume_cv_doc: '',

  highest_nursing_degree: '',
  photo_ID: '',
  proof_of_address_ID: '',
  patient_age_groups: '',

  follow_up_duration: '',
  offers_therapy_session: '',
  therapy_session: [],
  health_conditions_treated: [],
  health_specialties: [],
  speaks_additional_lang: '',
  additional_langs: [],
  ketamine_assisted_therapy: '',
  ketamine_assisted_therapy_more_info: '',

  race_ethnicity: '',
  therapy_preference_response: '',
  therapy_policy_acknowledgement: '',

  identity_details: '',

  policy_agreement: '',
  policy_agreement_signature: '',

  // custom fields
  race_ethnicity_other: '',
  additional_langs_other: '',
  therapy_session_other: '',
};
