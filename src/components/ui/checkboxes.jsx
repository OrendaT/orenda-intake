import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import RequiredMark from './required-mark';

const Checkboxes = ({
  label,
  name,
  options,
  size,
  className,
  disabled,
  required = true,
  errorMsg,
  registerOptions,
  validations,
  otherLabel,
  otherName,
}) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const selected = watch(name);
  const includesOther = Array.isArray(selected) && selected.includes('Other');

  return (
    <div>
      <h3 className='label'>
        {label}
        {required && <RequiredMark />}
      </h3>
      <div className={cn('grid sm:grid-cols-2', className)}>
        {options.map((option) => (
          <div key={name + option} className={cn('flex items-center gap-2')}>
            <input
              id={name + option}
              className={cn('peer flex-shrink-0', size)}
              type='checkbox'
              value={option}
              {...register(name, {
                disabled: disabled,
                required: {
                  value: required,
                  message: errorMsg || 'This field is required',
                },
                ...registerOptions,
                validate: validations,
              })}
            />
            <label htmlFor={name + option}>{option}</label>
          </div>
        ))}
      </div>

      {errors?.[name]?.message && (
        <p className='error px-3'>{errors?.[name]?.message}</p>
      )}

      {includesOther && (
        <Input
          label={otherLabel || 'Other? Please specify'}
          name={otherName || name + '_other'}
          required={includesOther}
        />
      )}
    </div>
  );
};
export default Checkboxes;
