export const FORMS = {
  intake: 'intake',
  credit_card: 'credit_card',
  provider_onboarding: 'provider_onboarding',
  intake_provider: 'intake_provider',
} as const;

export const FORM_IDS = {
  intake: 'intake_id',
  credit_card: 'credit_card_id',
  provider_onboarding: 'provider_onboarding_id',
  intake_provider: 'intake_provider_id',
} as const;

export const EXPIRY_TIME = 3;

export const US_STATES = [
  { value: 'New York', code: 'NY' },
  { value: 'Massachusetts', code: 'MA' },
  { value: 'New Jersey', code: 'NJ' },
  { value: 'Connecticut', code: 'CT' },
  { value: 'Alabama', code: 'AL' },
  { value: 'Alaska', code: 'AK' },
  { value: 'Arizona', code: 'AZ' },
  { value: 'Arkansas', code: 'AR' },
  { value: 'California', code: 'CA' },
  { value: 'Colorado', code: 'CO' },
  { value: 'Delaware', code: 'DE' },
  { value: 'Florida', code: 'FL' },
  { value: 'Georgia', code: 'GA' },
  { value: 'Hawaii', code: 'HI' },
  { value: 'Idaho', code: 'ID' },
  { value: 'Illinois', code: 'IL' },
  { value: 'Indiana', code: 'IN' },
  { value: 'Iowa', code: 'IA' },
  { value: 'Kansas', code: 'KS' },
  { value: 'Kentucky', code: 'KY' },
  { value: 'Louisiana', code: 'LA' },
  { value: 'Maine', code: 'ME' },
  { value: 'Maryland', code: 'MD' },
  { value: 'Michigan', code: 'MI' },
  { value: 'Minnesota', code: 'MN' },
  { value: 'Mississippi', code: 'MS' },
  { value: 'Missouri', code: 'MO' },
  { value: 'Montana', code: 'MT' },
  { value: 'Nebraska', code: 'NE' },
  { value: 'Nevada', code: 'NV' },
  { value: 'New Hampshire', code: 'NH' },
  { value: 'New Mexico', code: 'NM' },
  { value: 'North Carolina', code: 'NC' },
  { value: 'North Dakota', code: 'ND' },
  { value: 'Ohio', code: 'OH' },
  { value: 'Oklahoma', code: 'OK' },
  { value: 'Oregon', code: 'OR' },
  { value: 'Pennsylvania', code: 'PA' },
  { value: 'Rhode Island', code: 'RI' },
  { value: 'South Carolina', code: 'SC' },
  { value: 'South Dakota', code: 'SD' },
  { value: 'Tennessee', code: 'TN' },
  { value: 'Texas', code: 'TX' },
  { value: 'Utah', code: 'UT' },
  { value: 'Vermont', code: 'VT' },
  { value: 'Virginia', code: 'VA' },
  { value: 'Washington', code: 'WA' },
  { value: 'West Virginia', code: 'WV' },
  { value: 'Wisconsin', code: 'WI' },
  { value: 'Wyoming', code: 'WY' },
] as const;

// infer type automatically from the `code` property
export type StateCode = (typeof US_STATES)[number]['code'];

export const YES_NO = [{ value: 'Yes' }, { value: 'No' }];

export const acceptedFormats = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/heic',
  'application/pdf',
] as const;

export const acceptForCredentialing = [
  ...acceptedFormats,
  '.doc',
  '.docx',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
].join(',');

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
] as const;
