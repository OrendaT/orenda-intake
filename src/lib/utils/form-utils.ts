import type {
  CreditCardFormData,
  FieldConfig,
  FormData,
  IntakeFormData,
  OnboardingFormData,
} from '@/types';
import {
  convertBase64ToFile,
  convertFileListsToFiles,
  parseDates,
  toUSDate,
} from './conversion-utils';
import { isValidEmail, removeEmptyValues } from '.';

const _others = ['other', 'others'];

export const parseIntakeFormData = (data: IntakeFormData) => {
  // replace actual value with other
  if (data.race_other) {
    data.race = data.race_other;
    delete data.race_other;
  }
  if (data.relationship_status_other) {
    data.relationship_status = data.relationship_status_other;
    delete data.relationship_status_other;
  }
  if (data.preferred_pronouns_other) {
    data.preferred_pronouns = data.preferred_pronouns_other;
    delete data.preferred_pronouns_other;
  }
  if (data.symptoms_past_six_months_other) {
    const others = data.symptoms_past_six_months_other.split(',');
    data.symptoms_past_six_months = [
      ...data.symptoms_past_six_months.filter(
        (s) => !_others.includes(s.toLowerCase()),
      ),
      ...others,
    ];
    delete data.symptoms_past_six_months_other;
  }
  if (data.personal_medical_history_other) {
    const others = data.personal_medical_history_other.split(',');
    data.personal_medical_history = [
      ...data.personal_medical_history.filter(
        (s) => !_others.includes(s.toLowerCase()),
      ),
      ...others,
    ];
    delete data.personal_medical_history_other;
  }

  // convert Base64 strings to Files
  data = convertBase64ToFile(data);

  // convert FileLists to Files
  data = convertFileListsToFiles(data);

  // convert date objects to date string
  data = parseDates(data);

  // remove empty values
  data = removeEmptyValues(data);

  return data;
};

export const parseCCFormData = (data: CreditCardFormData) => {
  // convert Base64 strings to Files
  data = convertBase64ToFile(data);

  // convert date objects to date string
  data = parseDates(data);

  // remove empty values
  data = removeEmptyValues(data);

  return data;
};

export const parseOnboardingFormData = (data: OnboardingFormData) => {
  // replace values with others value
  if (data.race_ethnicity_other) {
    data.race_ethnicity = data.race_ethnicity_other;
    delete data.race_ethnicity_other;
  }
  if (data.additional_langs_other) {
    const others = data.additional_langs_other.split(',');
    data.additional_langs = [
      ...data.additional_langs.filter(
        (s) => !_others.includes(s.toLowerCase()),
      ),
      ...others,
    ];
    delete data.additional_langs_other;
  }

  if (data.states_of_license) delete data.states_of_license;
  if (data.nursing_degrees) delete data.nursing_degrees;

  // convert Base64 strings to Files
  data = convertBase64ToFile(data);

  // convert FileLists to Files
  data = convertFileListsToFiles(data);

  // convert date objects to date string
  data = parseDates(data);

  // remove empty values
  data = removeEmptyValues(data);

  return data;
};

export const checkFormData = (formState: FormData, fields: FieldConfig[]) => {
  const data: Record<string, unknown> = {};
  let isPendingForm = true;

  for (const { key, type, sendToDB = true } of fields) {
    const value = formState[key as keyof FormData];

    switch (type) {
      case 'string':
        if (typeof value !== 'string' || value.trim().length <= 3) {
          isPendingForm = false;
        }
        break;

      case 'array':
        if (!Array.isArray(value) || value.length <= 3) {
          isPendingForm = false;
        }
        break;

      case 'email':
        if (typeof value !== 'string' || !isValidEmail(value)) {
          isPendingForm = false;
        }
        break;

      case 'date':
        if (!value) {
          isPendingForm = false;
        } else {
          if (sendToDB) data[key] = toUSDate(value);
          continue;
        }
        break;
    }

    if (!sendToDB) continue;

    data[key] = value;
  }

  return { data, isPendingForm };
};

export function sanitizeState<T extends Record<string, unknown>>(
  formState: T,
  keysToRemove?: string[],
) {
  if (keysToRemove)
    keysToRemove.forEach((key) => {
      delete formState[key];
    });

  return formState;
}
