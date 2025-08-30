import {
  creditCardInitialValues,
  intakeInitialValues,
  providerOnboardingInitialValues,
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

// Intake Form
type OptionalIntakeFields = 'relationship_status_other';
export type IntakeFormData = Omit<
  typeof intakeInitialValues,
  OptionalIntakeFields
> &
  Partial<Pick<typeof intakeInitialValues, OptionalIntakeFields>>;

// Credit Card Form
export type CreditCardFormData = Omit<
  typeof creditCardInitialValues,
  'signature_date'
> & {
  signature_date: string | Date;
};

// Provider Onboarding Form
type OptionalOnboardingFields =
  | 'therapy_session_other'
  | 'additional_langs_other'
  | 'race_ethnicity_other';
export type ProviderOnboardingFormData = Omit<
  typeof providerOnboardingInitialValues,
  | 'therapy_session'
  | 'additional_langs'
  | 'states_of_license'
  | OptionalOnboardingFields
> &
  Partial<
    Pick<typeof providerOnboardingInitialValues, OptionalOnboardingFields>
  > & {
    states_of_license: string[];
    therapy_session: string[];
    additional_langs: string[];
  };

export type FormData =
  | IntakeFormData
  | CreditCardFormData
  | ProviderOnboardingFormData;

export type BaseFieldProps = {
  label?: string | ReactNode;
  name: string;
  // | keyof IntakeFormData
  // | keyof CreditCardFormData
  // | keyof ProviderOnboardingFormData;
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

export type CheckboxProps = SelectInputProps & {
  labelSuffix?: ReactNode;
  otherLabel?: string;
  otherName?: BaseFieldProps['name'];
};

export type SelectInputProps = SelectProps &
  BaseFieldProps & {
    options: Option[];
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
