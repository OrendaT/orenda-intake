import { cn } from '@/lib/utils';
import { useFormContext, useWatch } from 'react-hook-form';
import RequiredMark from './required-mark';
import type { CheckboxProps } from '@/types';
import Input from './input';
import HiddenSection from '../hidden-section';
import ErrorMessage from './error-message';

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
  const { register } = useFormContext();

  const selected = useWatch({ name, exact: true });
  const includesOther =
    Array.isArray(selected) &&
    (selected?.includes('Other') || selected?.includes('Others'));

  console.log('checkboxes re-render');

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
            <div className='grid' key={id}>
              <label className={cn('flex items-start gap-2 leading-none')}>
                <input
                  {...props}
                  className={cn('peer size-3.5 flex-shrink-0', size)}
                  data-option={value}
                  type='checkbox'
                  value={value}
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
                className={cn(
                  'ml-1.5 pt-0 before:left-0',
                  hiddenSectionClassName,
                )}
                show={isChecked && Boolean(hiddenSection)}
              >
                {hiddenSection}
              </HiddenSection>
            </div>
          );
        })}
      </div>

      <ErrorMessage name={name} className='px-3' />

      <HiddenSection show={includesOther} className='pt-1 pb-3'>
        <Input
          label={
            otherLabel ||
            `${Array.isArray(selected) ? selected?.find((val: string) => val?.includes('Other')) : selected}? Please specify`
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
