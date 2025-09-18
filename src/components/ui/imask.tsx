import type { MaskProps } from '@/types';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import InputMask from '@mona-health/react-input-mask';

const IMask = ({
  label,
  name,
  type,
  id,
  disabled,
  required = true,
  variant = 'standard',
  errorMsg,
  placeholder,
  rules,
  validations,
  inputProps,
  ...props
}: MaskProps) => {
  return (
    <Controller
      name={name}
      disabled={disabled}
      rules={{
        required: {
          value: required,
          message: errorMsg || 'This field is required',
        },
        validate: validations,
        ...rules,
      }}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <InputMask onChange={onChange} value={value} {...props}>
          <TextField
            inputRef={ref}
            required={required}
            type={type || 'text'}
            helperText={error ? error?.message : null}
            id={id || name}
            label={label}
            error={!!error}
            variant={variant || 'standard'}
            fullWidth
            placeholder={placeholder}
            {...inputProps}
          />
        </InputMask>
      )}
    />
  );
};
export default IMask;
