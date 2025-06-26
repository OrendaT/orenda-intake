import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';

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
  showHiddenSectionValue,
  hiddenSection,
  registerOptions,
  containerClassName,
}) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const selectedValue = watch(name);

  const showHiddenSection =
    typeof showHiddenSectionValue === 'number'
      ? selectedValue === options[showHiddenSectionValue]
      : Array.isArray(showHiddenSectionValue)
        ? showHiddenSectionValue.includes(selectedValue)
        : selectedValue === showHiddenSectionValue;

  return (
    <div className={cn('w-full', containerClassName)}>
      {label && (
        <h3 className='label'>
          {label}
          {required && showRequiredMark && (
            <>
              &nbsp;
              <span className='text-orenda-purple'>*</span>
            </>
          )}
          <div className='inline-flex flex-col items-center h-full'>{labelSuffix}</div>
        </h3>
      )}
      <div
        className={cn(
          grid ? 'grid gap-3 sm:grid-cols-2' : 'flex items-center ~gap-5/7',
          className,
        )}
      >
        {options.map((option) => (
          <div
            key={name + option}
            className={cn('flex items-center gap-2 font-medium ~text-sm/base')}
          >
            <input
              id={name + option}
              className='flex-shrink-0 peer size-4'
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
            <label htmlFor={name + option}>{option}</label>
          </div>
        ))}
      </div>
      {errors?.[name]?.message && (
        <p className='px-3 error'>{errors?.[name]?.message}</p>
      )}

      {showHiddenSection && (
        <div className='mt-5 bg-transparent hidden-section'>
          {hiddenSection}
        </div>
      )}
    </div>
  );
};
export default Radios;
