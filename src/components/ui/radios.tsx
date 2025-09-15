import { cn } from '@/lib/utils';
import { useFormContext, useWatch } from 'react-hook-form';
import RequiredMark from './required-mark';
import type { RadioProps } from '@/types';
import HiddenSection from '../hidden-section';
import ErrorMessage from './error-message';

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
  ...props
}: RadioProps) => {
  const {
    register,
  } = useFormContext();

  const selectedValue = useWatch({ name, exact: true });

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
            <label
              key={id}
              className={cn('clamp-[text,sm,base] flex items-start gap-2')}
            >
              <input
                {...props}
                className='peer size-4 flex-shrink-0'
                type='radio'
                value={value}
                data-option={value}
                {...register(name, {
                  disabled: disabled,
                  required: {
                    value: required,
                    message: errorMsg,
                  },
                  ...registerOptions,
                })}
              />
              <span className='-mt-[0.25px] leading-none'>{option}</span>
            </label>
          );
        })}
      </div>
<ErrorMessage name={name} className='px-3'/>

      <HiddenSection show={showHiddenSection}>{hiddenSection}</HiddenSection>
    </div>
  );
};
export default Radios;

type ShowHiddenValue = string | number | (string | number)[] | boolean | null;

function shouldShowHiddenSection(
  showHiddenSectionValue: ShowHiddenValue,
  selectedValue: unknown,
  options: readonly { value: string }[],
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

  return valuesToCheck.some((val) => {
    if (typeof val === 'string') {
      return selectedValue === val;
    }

    if (typeof val === 'number' && val >= 0 && val < options.length) {
      return selectedValue === options[val].value;
    }

    return false;
  });
}
