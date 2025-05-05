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
  className,
  ...inputProps
}) => {
  return (
    <Controller
      name={name}
      rules={{
        disabled,
        required: {
          value: required,
          message: errorMsg,
        },
        pattern,
        minLength,
        validate: validations,
      }}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <TextField
          {...field}
          inputRef={ref}
          required={required}
          type={type}
          helperText={error ? error.message : null}
          id={id || name}
          error={!!error}
          variant={variant}
          fullWidth
          placeholder={placeholder}
          className={className}
          {...inputProps}
        />
      )}
    />
  );
};
export default Input;
