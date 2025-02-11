import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const Input = ({
  name,
  type = 'text',
  id,
  disabled,
  required = true,
  variant = 'standard',
  errorMsg = 'This field is required',
  placeholder,
  pattern,
  minLength,
  validations,
  ...inputProps
}) => {
  return (
    <Controller
      name={name}
      rules={{
        disabled: disabled,
        required: {
          value: required,
          message: errorMsg,
        },
        pattern,
        minLength,
        validate: validations,
      }}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          required={required}
          type={type}
          helperText={error ? error.message : null}
          id={id || name}
          error={!!error}
          variant={variant}
          fullWidth
          placeholder={placeholder}
          {...inputProps}
        />
      )}
    />
  );
};
export default Input;
