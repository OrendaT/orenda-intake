import { cn, isValidEmail } from '@/lib/utils';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import type { InputProps } from '@/types';
import RequiredMark from './required-mark';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Input = ({
  name,
  customLabel,
  type = 'text',
  id,
  required = true,
  disabled,
  variant = 'standard',
  errorMsg = 'This field is required',
  validations,
  containerClassName,
  registerOptions,
  ...inputProps
}: InputProps) => {
  const [currentType, setCurrentType] = useState(type);
  const togglePassword = () => {
    setCurrentType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  return (
    <div className={cn('w-full', containerClassName)}>
      {customLabel && (
        <h3 className='label'>
          {customLabel}
          {required && <RequiredMark />}
        </h3>
      )}
      <Controller
        name={name}
        disabled={disabled}
        rules={{
          required: {
            value: required,
            message: errorMsg,
          },
          ...registerOptions,
          validate: {
            isValidEmail: (value: string) => {
              if (value && type === 'email')
                return (
                  isValidEmail(value) || 'Please enter a valid email address'
                );
              return true;
            },
            ...validations,
          },
        }}
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <TextField
            {...field}
            inputRef={ref}
            required={required}
            type={currentType}
            helperText={error ? error.message : null}
            id={id || name}
            error={!!error}
            variant={variant}
            fullWidth
            slotProps={{
              input: {
                endAdornment: type === 'password' && (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label={
                        currentType === 'text'
                          ? 'hide the password'
                          : 'display the password'
                      }
                      title={
                        currentType === 'text'
                          ? 'Hide'
                          : 'Show'
                      }
                      onClick={togglePassword}
                      className='*:size-[1.35rem]'
                      edge='start'
                    >
                      {currentType === 'password' ? <FiEyeOff /> : <FiEye />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            {...inputProps}
          />
        )}
      />
    </div>
  );
};
export default Input;
