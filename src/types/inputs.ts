import type { SelectProps, TextFieldProps } from '@mui/material';
import type { ComponentProps, ReactNode } from 'react';
import type { DatePickerProps } from 'react-date-picker';
import type { ControllerProps, RegisterOptions } from 'react-hook-form';
import type {
  CreditCardFormData,
  IntakeFormData,
  ProviderOnboardingFormData,
} from './forms';
import ReactInputMask from 'react-input-mask';

type Option = {
  label?: string;
  value: string;
  readonly?: boolean;
};

type NamePath =
  | keyof IntakeFormData
  | keyof CreditCardFormData
  | keyof ProviderOnboardingFormData;

export type BaseFieldProps = {
  label?: string | ReactNode;
  name: NamePath;

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
  heading?: string | ReactNode;
  subheading?: string | ReactNode;
  maxSize?: 5;
  accept?: ComponentProps<'input'>['accept'];
};

export type TDatePickerProps = BaseFieldProps & DatePickerProps;

export type MaskProps = BaseFieldProps &
  ComponentProps<typeof ReactInputMask> & {
    variant?: TextFieldProps['variant'];
    inputProps?: TextFieldProps;
  };

export type SelectInputProps = SelectProps<string> &
  BaseFieldProps & {
    options: readonly Option[];
  };

export type CheckboxProps = BaseFieldProps &
  ComponentProps<'input'> & {
    options: readonly Option[];
    labelSuffix?: ReactNode;
    otherLabel?: string;
    otherName?: BaseFieldProps['name'];
  };

export type RadioProps = BaseFieldProps & {
  labelSuffix?: ReactNode;
  showHiddenSectionValue?: number | string | boolean | string[] | number[];
  hiddenSection?: ReactNode;
  options: Option[];
};

export type ButtonProps = ComponentProps<'button'> & {
  asChild?: boolean;
  hoverClass?: string;
  isLoading?: boolean;
};
