export const FORM_EPS = {
  intake: 'patients',
  credit_card: 'credit-cards',
  providers: 'providers',
  intake_provider: 'patients_with_provider',
} as const;

export const PENDING_FORM_EPS = {
  intake: 'patients/pending-patient',
  credit_card: 'credit-cards/pending-credit-card',
  providers: 'providers/pending-provider',
  intake_provider: 'patients_with_provider/pending-patient',
} as const;
