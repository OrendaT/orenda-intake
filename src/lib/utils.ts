import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Cookies from 'js-cookie';
import { EXPIRY_TIME } from '@/lib/constants';
import type { CreditCardFormData, IntakeFormData } from '@/types';

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

function hasValue<T>(entry: [string, T]): entry is [string, NonNullable<T>] {
  const [_, value] = entry;
  return value !== null && value !== undefined && value !== '';
}

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
  // convert Base64 strings to Files
  data = convertBase64ToFile<IntakeFormData>(data);

  // convert FileLists to Files
  data = convertFileListsToFiles<IntakeFormData>(data);

  // parse DOB (convert date object to US date)
  const rawDOB = new Date(data.date_of_birth);
  const formattedDOB = rawDOB.toLocaleDateString('en-US');
  data.date_of_birth = formattedDOB;

  data = Object.fromEntries(
    Object.entries(data).filter(hasValue),
  ) as IntakeFormData;

  return data;
};

export const parseCCFormData = (data: CreditCardFormData) => {
  data = convertBase64ToFile<CreditCardFormData>(data);

  // parse signature and  date (convert date object to US date)
  const rawDOB = new Date(data.date_of_birth);
  const formattedDOB = rawDOB.toLocaleDateString('en-US');
  data.date_of_birth = formattedDOB;

  const rawSignatureDate = new Date(data.signature_date);
  const formattedSignatureDate = rawSignatureDate.toLocaleDateString('en-US');
  data.signature_date = formattedSignatureDate;

  return data;
};

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
