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
  toUSDate,
} from './conversion-utils';
import { isValidEmail, removeEmptyValues } from '.';

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

  // convert Base64 strings to Files
  data = convertBase64ToFile(data);

  // convert FileLists to Files
  data = convertFileListsToFiles(data);

  // parse DOB (convert date object to US date)
  data.date_of_birth = toUSDate(data.date_of_birth);

  // remove empty values
  data = removeEmptyValues(data);

  return data;
};

export const parseCCFormData = (data: CreditCardFormData) => {
  // convert Base64 strings to Files
  data = convertBase64ToFile(data);

  // parse DOB date (convert date object to US date)
  data.date_of_birth = toUSDate(data.date_of_birth);

  // parse signature date (convert date object to US date)
  data.signature_date = toUSDate(data.signature_date);

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
    const otherLanguages = data.additional_langs_other.split(',');
    data.additional_langs = [...data.additional_langs, ...otherLanguages];
    delete data.additional_langs_other;
  }

  // convert Base64 strings to Files
  data = convertBase64ToFile(data);

  // convert FileLists to Files
  data = convertFileListsToFiles(data);

  // remove empty values
  data = removeEmptyValues(data);

  return data;
};

//
export const checkFormData = (formState: FormData, fields: FieldConfig[]) => {
  const data: Record<string, unknown> = {};
  let isPendingForm = true;

  for (const { key, type, noSend } of fields) {
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
          if (!noSend) data[key] = toUSDate(value);
          continue;
        }
        break;
    }

    if (noSend) continue;

    data[key] = value;
  }

  return { data, isPendingForm };
};

export function sanitizeState<T extends Record<string, unknown>>(
  formState: T,
  keysToRemove?: string[],
) {
  if (keysToRemove)
    for (const key of keysToRemove) {
      delete formState[key];
    }
  return formState;
}
