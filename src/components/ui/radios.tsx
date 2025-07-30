import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import RequiredMark from './required-mark';
import type { RadioProps } from '@/types';
import HiddenSection from '../hidden-section';

const Radios = ({
  name,
  options,
  className,
  disabled,
  label,
  grid = true,
  required = true,
  showRequiredMark = true,
  errorMsg = 'This field is required',
  labelSuffix,
  showHiddenSectionValue = false,
  hiddenSection,
  registerOptions,
  containerClassName,
}: RadioProps) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const selectedValue = watch(name);

  const showHiddenSection = shouldShowHiddenSection(
    showHiddenSectionValue,
    selectedValue,
    options,
  );

  return (
    <div className={cn('mt-2 w-full', containerClassName)}>
      {label && (
        <h3 className='label'>
          {label}
          {required && showRequiredMark && <RequiredMark />}
          <div className='inline-flex h-full flex-col items-center'>
            {labelSuffix}
          </div>
        </h3>
      )}
      <div
        className={cn(
          grid
            ? 'grid gap-x-3 gap-y-4 py-1 sm:grid-cols-2'
            : 'clamp-[gap,5,7] flex items-center',
          className,
        )}
      >
        {options.map(({ label, value }) => {
          const id = name + value;
          const option = label || value;
          return (
            <div
              key={id}
              className={cn(
                'clamp-[text,sm,base] flex items-start gap-2 font-medium',
              )}
            >
              <input
                id={id}
                className='peer size-4 flex-shrink-0'
                type='radio'
                value={option}
                {...register(name, {
                  disabled: disabled,
                  required: {
                    value: required,
                    message: errorMsg,
                  },
                  ...registerOptions,
                })}
              />
              <label
                className='-mt-[0.25px] leading-none'
                htmlFor={name + option}
              >
                {option}
              </label>
            </div>
          );
        })}
      </div>
      {errors?.[name]?.message && (
        <p className='error px-3'>{errors?.[name]?.message.toString()}</p>
      )}

      <HiddenSection show={showHiddenSection}>{hiddenSection}</HiddenSection>
    </div>
  );
};
export default Radios;

type ShowHiddenValue = string | number | (string | number)[] | boolean | null;

function shouldShowHiddenSection(
  showHiddenSectionValue: ShowHiddenValue,
  selectedValue: unknown,
  options: { value: string }[],
): boolean {
  if (showHiddenSectionValue === null || showHiddenSectionValue === false) {
    return false;
  }
  
  if (showHiddenSectionValue === true) {
    return true;
  }
  
  const valuesToCheck = Array.isArray(showHiddenSectionValue) 
    ? showHiddenSectionValue 
    : [showHiddenSectionValue];
    
  return valuesToCheck.some(val => {
    if (typeof val === 'string') {
      return selectedValue === val;
    }
    
    if (typeof val === 'number' && val >= 0 && val < options.length) {
      return selectedValue === options[val].value;
    }
    
    return false;
  });
}