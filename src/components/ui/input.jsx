import { cn } from '@/lib/utils';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const Input = ({
  name,
  customLabel,
  type = 'text',
  id,
  disabled,
  required = true,
  variant = 'standard',
  errorMsg = 'This field is required',
  placeholder,
  validations,
  className,
  containerClassName,
  registerOptions,
  ...inputProps
}) => {
  return (
    <div className={cn(containerClassName)}>
      {customLabel && (
        <h3 className='label'>
          {customLabel}
          {required && (
            <>
              &nbsp;
              <span className='text-orenda-purple'>*</span>
            </>
          )}
        </h3>
      )}
      <Controller
        name={name}
        rules={{
          disabled,
          required: {
            value: required,
            message: errorMsg,
          },
          ...registerOptions,
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
    </div>
  );
};
export default Input;
