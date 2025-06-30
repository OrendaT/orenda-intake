import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';

const IMask = ({
  label,
  name,
  type,
  id,
  mask,
  disabled,
  required = true,
  variant,
  errorMsg,
  placeholder,
  registerOptions,
  validations,
  maskPlaceholder,
  inputProps,
  ...props
}) => {
  return (
    <Controller
      name={name}
      rules={{
        disabled: disabled,
        required: {
          value: required,
          message: errorMsg || 'This field is required',
        },
        validate: validations,
        ...registerOptions,
      }}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <InputMask mask={mask} onChange={onChange} value={value} {...props}>
          {(maskProps) => (
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
              {...maskProps}
              {...inputProps}
            />
          )}
        </InputMask>
      )}
    />
  );
};
export default IMask;
