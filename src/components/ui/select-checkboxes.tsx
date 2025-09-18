import { cn } from '@/lib/utils';
import type { CheckboxProps } from '@/types';
import { useFormContext, useWatch } from 'react-hook-form';
import { LuX } from 'react-icons/lu';
import RequiredMark from './required-mark';
import HiddenSection from '../hidden-section';
import Input from './input';
import ErrorMessage from './error-message';

const SelectCheckboxes = ({
  label,
  containerClassName,
  showRequiredMark = true,
  options,
  name,
  className,
  required = true,
  disabled,
  otherLabel,
  otherName,
  validations,
  registerOptions,
}: CheckboxProps) => {
  const { register } = useFormContext();

  const selected = useWatch({ name, exact: true });
  const includesOther =
    Array.isArray(selected) &&
    (selected?.includes('Other') || selected?.includes('Others'));

  return (
    <div className={cn('mt-2 w-full', containerClassName)}>
      {label && (
        <h3 className='label relative mb-4'>
          {label}
          {required && showRequiredMark && <RequiredMark />}
        </h3>
      )}
      <div className='flex flex-wrap items-center gap-4'>
        {options.map(({ label, value, readonly }) => {
          const id = name + value;
          const option = label || value;
          return (
            <label
              key={id}
              className={cn(
                'has-checked:bg-orenda-purple has-checked:border-orenda-purple flex w-fit cursor-pointer items-center gap-2 rounded-2xl border border-[#E7E7E7] px-3 py-[0.38rem] text-xs leading-none transition-all duration-150 ease-in-out has-checked:text-white',
                className,
                { 'pointer-events-none': readonly },
              )}
            >
              <input
                className='peer'
                type='checkbox'
                value={value}
                id={id}
                {...register(name, {
                  required: {
                    value: required,
                    message: 'Please select at least one',
                  },
                  disabled: disabled,
                  validate: validations,
                  ...registerOptions,
                })}
                hidden
              />
              {option}

              <LuX className='zoom-in animate-in -mt-px hidden size-3.5 peer-checked:inline-block' />
            </label>
          );
        })}
      </div>

      <ErrorMessage name={name} className='px-2' />

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

export default SelectCheckboxes;
