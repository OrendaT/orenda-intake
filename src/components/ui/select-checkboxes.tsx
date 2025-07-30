import { cn } from '@/lib/utils';
import type { SelectInputProps } from '@/types';
import { useFormContext } from 'react-hook-form';
import { LuX } from 'react-icons/lu';
import RequiredMark from './required-mark';

const SelectCheckboxes = ({
  label,
  containerClassName,
  showRequiredMark = true,
  options,
  name,
  className,
  required = true,
  disabled,
}: SelectInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={cn('mt-2 w-full', containerClassName)}>
      {label && (
        <h3 className='label mb-4'>
          {label}
          {required && showRequiredMark && <RequiredMark />}
        </h3>
      )}
      <div className='flex flex-wrap items-center gap-4'>
        {options.map(({ label, value }) => {
          const id = name + value;
          const option = label || value;
          return (
            <label
              key={id}
              className={cn(
                'has-checked:bg-orenda-purple has-checked:border-orenda-purple flex w-fit cursor-pointer items-center gap-2 rounded-2xl border border-[#E7E7E7] px-3 py-[0.38rem] text-xs leading-none has-checked:text-white',
                className,
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
                })}
                hidden
              />
              {option}
              <LuX className='zoom-in animate-in -mt-px hidden size-3.5 peer-checked:inline-block' />
            </label>
          );
        })}
      </div>
      {errors?.[name]?.message && (
        <p className='error mt-0 px-3'>{errors?.[name]?.message.toString()}</p>
      )}
    </div>
  );
};

export default SelectCheckboxes;
