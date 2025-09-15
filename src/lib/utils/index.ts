import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Cookies from 'js-cookie';
import { EXPIRY_TIME } from '@/lib/constants';
import type { FieldErrors } from 'react-hook-form';
import { toast } from 'sonner';

export * from './form-utils';
export * from './conversion-utils';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const checkErrors = (errors: FieldErrors) => {
  if (Object.entries(errors)?.length) {
    const [name, error] = Object.entries(errors)[0];
    toast.error('Please ensure all required fields are filled out.', {
      description: `${name}:  ${error?.message}`,
    });
  }
};

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

export const removeLSItem = (key: string) => {
  localStorage.removeItem(key);
  console.log('removed');
};

export const isNumeric = (value: string | number) => {
  if (typeof value === 'number') return !isNaN(value);
  if (typeof value === 'string') return /^\d+$/.test(value.trim());
  return false;
};

export const isValidEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export function removeEmptyValues<T>(obj: Record<string, unknown>): T {
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
