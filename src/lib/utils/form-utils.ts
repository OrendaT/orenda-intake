import type {
  CreditCardFormData,
  IntakeFormData,
  ProviderOnboardingFormData,
} from '@/types';
import {
  convertBase64ToFile,
  convertFileListsToFiles,
} from './conversion-utils';
import { removeEmptyValues } from '.';

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

  // convert Base64 strings to Files
  data = convertBase64ToFile(data);

  // convert FileLists to Files
  data = convertFileListsToFiles(data);

  // parse DOB (convert date object to US date)
  const rawDOB = new Date(data.date_of_birth);
  const formattedDOB = rawDOB.toLocaleDateString('en-US');
  data.date_of_birth = formattedDOB;

  // remove empty values
  data = removeEmptyValues(data);

  return data;
};

export const parseCCFormData = (data: CreditCardFormData) => {
  // convert Base64 strings to Files
  data = convertBase64ToFile(data);

  // parse DOB date (convert date object to US date)
  const rawDOB = new Date(data.date_of_birth);
  const formattedDOB = rawDOB.toLocaleDateString('en-US');
  data.date_of_birth = formattedDOB;

  // parse signature date (convert date object to US date)
  const rawSignatureDate = new Date(data.signature_date);
  const formattedSignatureDate = rawSignatureDate.toLocaleDateString('en-US');
  data.signature_date = formattedSignatureDate;

  // remove empty values
  data = removeEmptyValues(data);

  return data;
};

export const parseOnboardingFormData = (data: ProviderOnboardingFormData) => {
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
