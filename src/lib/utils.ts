import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Cookies from 'js-cookie';
import { EXPIRY_TIME } from '@/lib/constants';
import type {
  CreditCardFormData,
  IntakeFormData,
  ProviderOnboardingFormData,
} from '@/types';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const setItem = <T = unknown>(key: string, value: T) =>
  Cookies.set(key, JSON.stringify(value), { expires: EXPIRY_TIME });

export const setLSItem = <T = unknown>(key: string, value: T) =>
  localStorage.setItem(key, JSON.stringify(value));

export const getItem = <T = unknown>(key: string): T | undefined => {
  const item = Cookies.get(key);
  if (item) {
    return JSON.parse(item) as T;
  }
  return undefined;
};

export const getLSItem = (key: string) => {
  let item = localStorage.getItem(key);
  if (item) {
    item = JSON.parse(item);
  }
  return item;
};

export const removeItem = (key: string) => Cookies.remove(key);

export const removeLSItem = (key: string) => localStorage.removeItem(key);

export const isNumeric = (value: string | number) => {
  if (typeof value === 'number') return !isNaN(value);
  if (typeof value === 'string') return /^\d+$/.test(value.trim());
  return false;
};

export const isValidEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

function removeEmptyValues<T>(obj: Record<string, unknown>): T {
  const newObj: Record<string, unknown> = {};

  const isValid = (value: unknown) =>
    value !== null && value !== undefined && value !== '';

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (isValid(value)) {
        newObj[key] = value;
      } else if (Array.isArray(value)) {
        const filteredArray = value.filter((item) => isValid(item));
        if (filteredArray.length > 0) {
          newObj[key] = filteredArray;
        }
      }
    }
  }

  return newObj as T;
}

export const convertToFormData = (obj: Record<string, unknown>) => {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        formData.append(key, item);
      });
    } else if (typeof value === 'string') {
      formData.append(key, value);
    } else if (value instanceof File) {
      formData.append(key, value);
    }
  });

  return formData;
};

/**
 * Converts a base64 data URL to a File object.
 * @param {string} base64Data - The base64 data URL.
 * @param {string} fileName - The name of the file to create (e.g., 'signature.png').
 * @returns {File|Blob} - A File object (or Blob fallback) that can be uploaded or saved.
 */
export const base64ToFile = (base64Data: string, fileName: string) => {
  if (!base64Data.includes(',')) {
    return '';
  }

  const [header, data] = base64Data.split(',');
  const mimeMatch = header.match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'application/octet-stream';

  const byteString = atob(data);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  // Ensure filename has an extension
  if (!/\.[0-9a-z]+$/i.test(fileName)) {
    const ext = mime.split('/')[1] || 'png'; // fallback
    fileName = `${fileName}.${ext}`;
  }

  return new File([uint8Array], fileName, { type: mime });
};

export const convertFileListsToFiles = <T>(obj: Record<string, unknown>): T => {
  Object.entries(obj).forEach(([key, value]) => {
    if (value instanceof FileList && value.length === 1) {
      obj[key] = value[0];
    }
  });
  return obj as T;
};

export const convertBase64ToFile = <T>(obj: Record<string, unknown>): T => {
  Object.entries(obj).forEach(([key, value]) => {
    if (value && typeof value === 'object' && 'base64' in value) {
      const base64 = value.base64;
      if (typeof base64 === 'string') {
        obj[key] = base64ToFile(base64, key);
      }
    }
  });

  return obj as T;
};

export const parseIntakeFormData = (data: IntakeFormData) => {
  // replace actual value with other
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
  if (data.therapy_session_other) {
    const otherSessions = data.therapy_session_other.split(',');
    data.therapy_session = [...data.therapy_session, ...otherSessions];
    delete data.therapy_session_other;
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
