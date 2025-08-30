export const FORMS = {
  intake: 'intake',
  credit_card: 'credit_card',
  provider_onboarding: 'provider_onboarding',
} as const;

export const FORM_IDS = {
  intake: 'intake_id',
  credit_card: 'credit_card_id',
  provider_onboarding: 'provider_onboarding_id',
} as const;

export const EXPIRY_TIME = 3;

export const US_STATES = [
  { value: 'New York' },
  { value: 'Massachusetts' },
  { value: 'New Jersey' },
  { value: 'Connecticut' },
  { value: 'Alabama' },
  { value: 'Alaska' },
  { value: 'Arizona' },
  { value: 'Arkansas' },
  { value: 'California' },
  { value: 'Colorado' },
  { value: 'Delaware' },
  { value: 'Florida' },
  { value: 'Georgia' },
  { value: 'Hawaii' },
  { value: 'Idaho' },
  { value: 'Illinois' },
  { value: 'Indiana' },
  { value: 'Iowa' },
  { value: 'Kansas' },
  { value: 'Kentucky' },
  { value: 'Louisiana' },
  { value: 'Maine' },
  { value: 'Maryland' },
  { value: 'Michigan' },
  { value: 'Minnesota' },
  { value: 'Mississippi' },
  { value: 'Missouri' },
  { value: 'Montana' },
  { value: 'Nebraska' },
  { value: 'Nevada' },
  { value: 'New Hampshire' },
  { value: 'New Mexico' },
  { value: 'North Carolina' },
  { value: 'North Dakota' },
  { value: 'Ohio' },
  { value: 'Oklahoma' },
  { value: 'Oregon' },
  { value: 'Pennsylvania' },
  { value: 'Rhode Island' },
  { value: 'South Carolina' },
  { value: 'South Dakota' },
  { value: 'Tennessee' },
  { value: 'Texas' },
  { value: 'Utah' },
  { value: 'Vermont' },
  { value: 'Virginia' },
  { value: 'Washington' },
  { value: 'West Virginia' },
  { value: 'Wisconsin' },
  { value: 'Wyoming' },
];

export const YES_NO = [{ value: 'Yes' }, { value: 'No' }];

export const acceptForCredentialing =
  'image/*,application/pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';

export const ethnicities = [
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
