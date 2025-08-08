import {
  creditCardInitialValues,
  intakeInitialValues,
} from '@/lib/definitions';
import type { SelectProps, TextFieldProps } from '@mui/material';
import type { ComponentProps, ReactNode } from 'react';
import type { DatePickerProps } from 'react-date-picker';
import type { ControllerProps, RegisterOptions } from 'react-hook-form';
import type ReactInputMask from 'react-input-mask';

type Option = {
  label?: string;
  value: string;
};

export type SVGProps = React.SVGProps<SVGSVGElement>;

type OptionalIntakeFields = 'relationship_status_other';
export type IntakeFormData = Omit<
  typeof intakeInitialValues,
  OptionalIntakeFields
> &
  Partial<Pick<typeof intakeInitialValues, OptionalIntakeFields>>;

export type CreditCardFormData = Omit<
  typeof creditCardInitialValues,
  'signature_date'
> & {
  signature_date: string | Date;
};

export type BaseFieldProps = {
  label?: string | ReactNode;
  name: string;
  customLabel?: string;
  showRequiredMark?: boolean;
  errorMsg?: string;
  placeholder?: string;
  validations?: RegisterOptions['validate'];
  className?: string;
  containerClassName?: string;
  registerOptions?: RegisterOptions;
  rules?: ControllerProps['rules'];
  required?: boolean;
  disabled?: boolean;
  grid?: boolean;
};

export type InputProps = BaseFieldProps & TextFieldProps;

export type FileInputProps = BaseFieldProps & {
  maxSize?: 5;
  accept?: ComponentProps<'input'>['accept'];
};

export type TDatePickerProps = BaseFieldProps & DatePickerProps;

export type MaskProps = BaseFieldProps &
  ComponentProps<typeof ReactInputMask> & {
    variant?: TextFieldProps['variant'];
    inputProps?: TextFieldProps;
  };

export type CheckboxProps = SelectInputProps & {
  labelSuffix?: ReactNode;
  otherLabel?: string;
  otherName?: string;
};

export type SelectInputProps = SelectProps &
  BaseFieldProps & {
    options: Option[];
  };

export type RadioProps = BaseFieldProps & {
  labelSuffix?: ReactNode;
  showHiddenSectionValue?: number | string;
  hiddenSection?: ReactNode;
  options: Option[];
};

export type ButtonProps = ComponentProps<'button'> & {
  asChild?: boolean;
  hoverClass?: string;
  isLoading?: boolean;
};
