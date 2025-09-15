import type { RadioProps } from '@/types';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from './error-message';

const RadioBoxes = ({
  name,
  options,
  className,
  disabled,
  required = true,
  errorMsg,
  validations,
  registerOptions,
}: RadioProps) => {
  const { register } = useFormContext();

  return (
    <>
      {options.map(({ label, value }) => {
        return (
          <label
            className={clsx(
              'clamp-[px,2,4] clamp-[py,2,4] block h-full cursor-pointer content-center rounded border border-gray-500 text-center text-sm font-semibold whitespace-pre-line has-[:checked]:bg-violet-200 has-[:checked]:ring-1 has-[:checked]:ring-purple-300',
              className,
            )}
          >
            {label || value}

            {/* Hidden radio input */}
            <input
              className='peer'
              hidden
              type='radio'
              value={value}
              {...register(name, {
                disabled: disabled,
                required: {
                  value: required,
                  message: errorMsg || 'This field is required',
                },
                validate: validations,
                ...registerOptions,
              })}
            />
          </label>
        );
      })}
      <ErrorMessage name={name} className='px-3' />
    </>
  );
};
export default RadioBoxes;
