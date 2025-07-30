import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import RequiredMark from './required-mark';
import type { CheckboxProps } from '@/types';
import Input from './input';
import HiddenSection from '../hidden-section';

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
  containerClassName,
}: CheckboxProps) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const selected = watch(name);
  const includesOther = Array.isArray(selected) && selected.includes('Other');

  return (
    <div className={cn('mt-2 w-full', containerClassName)}>
      <h3 className='label'>
        {label}
        {required && <RequiredMark />}
      </h3>
      <div className={cn('grid gap-x-3 sm:grid-cols-2', className)}>
        {options.map(({ label, value }) => {
          const option = label || value;
          const id = name + value;

          return (
            <div key={id} className={cn('flex items-baseline gap-2')}>
              <input
                id={id}
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
              <label htmlFor={id}>{option}</label>
            </div>
          );
        })}
      </div>

      {errors?.[name]?.message && (
        <p className='error px-3'>{errors?.[name]?.message.toString()}</p>
      )}

      <HiddenSection show={includesOther} className='pb-3 pt-1'>
        <Input
          label={otherLabel || 'Other? Please specify'}
          name={otherName || name + '_other'}
          required={includesOther}
        />
      </HiddenSection>
    </div>
  );
};
export default Checkboxes;
