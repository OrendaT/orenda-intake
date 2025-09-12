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
  hiddenSectionClassName,
  ...props
}: CheckboxProps) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const selected = watch(name);
  const includesOther =
    Array.isArray(selected) &&
    (selected.includes('Other') || selected.includes('Others'));

  return (
    <div className={cn('mt-2 w-full', containerClassName)}>
      <h3 className='label'>
        {label}
        {required && <RequiredMark />}
      </h3>
      <div className={cn('grid gap-3 sm:grid-cols-2', className)}>
        {options.map(({ label, value, hiddenSection }) => {
          const option = label || value;
          const id = name + value;
          const isChecked =
            Array.isArray(selected) && selected.includes(option);

          return (
            <div className='grid'>
              <label
                key={id}
                className={cn('flex items-start gap-2 leading-none')}
              >
                <input
                  {...props}
                  className={cn('peer size-3.5 flex-shrink-0', size)}
                  data-option={option}
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
                <span className='-mt-px leading-none'>{option}</span>
              </label>

              <HiddenSection
                className={cn('pt-0', hiddenSectionClassName)}
                show={isChecked && Boolean(hiddenSection)}
              >
                {hiddenSection}
              </HiddenSection>
            </div>
          );
        })}
      </div>

      {errors?.[name]?.message && (
        <p className='error px-3'>{errors?.[name]?.message.toString()}</p>
      )}

      <HiddenSection show={includesOther} className='pt-1 pb-3'>
        <Input
          label={
            otherLabel ||
            `${Array.isArray(selected) ? selected?.find((val: string) => val.includes('Other')) : selected}? Please specify`
          }
          name={otherName || ((name + '_other') as CheckboxProps['name'])}
          required={includesOther}
          size='small'
        />
      </HiddenSection>
    </div>
  );
};
export default Checkboxes;
