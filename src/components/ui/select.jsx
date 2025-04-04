import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MUISelect,
} from '@mui/material';
import { Controller } from 'react-hook-form';

const Select = ({
  label,
  name,
  id,
  options,
  disabled,
  required = true,
  variant = 'standard',
  errorMsg = 'This field is required',
  placeholder,
  pattern,
  minLength,
  validations,
  ...selectProps
}) => {
  return (
    <div>
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
          <FormControl
            required={required}
            fullWidth
            variant={variant}
            error={!!error}
          >
            <InputLabel id={id || name}>{label}</InputLabel>
            <MUISelect
              {...field}
              value={field.value || ''}
              label={label}
              id={id || name}
              fullWidth
              placeholder={placeholder}
              {...selectProps}
            >
              {!required && <MenuItem value=''>None</MenuItem>}
              {options?.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </MUISelect>
            {error && <FormHelperText>{errorMsg}</FormHelperText>}
          </FormControl>
        )}
      />
    </div>
  );
};
export default Select;
