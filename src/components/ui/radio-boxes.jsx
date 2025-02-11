import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

const RadioBoxes = ({
  name,
  options,
  className,
  disabled,
  required = true,
  errorMsg,
  validations,
  registerOptions,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {options.map((option) => (
        <label
          key={name + option}
          className={clsx(
            'block h-full cursor-pointer content-center rounded border border-gray-500 text-center text-sm font-semibold ~px-2/4 ~py-2/4 has-[:checked]:bg-violet-200 has-[:checked]:ring-1 has-[:checked]:ring-purple-300',
            className,
          )}
        >
          {option}

          {/* Hidden radio input */}
          <input
            className='peer'
            hidden
            type='radio'
            value={option}
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
      ))}
      {errors?.[name]?.message && (
        <p className='!mt-2 px-3 text-xs text-red-500'>{errors?.[name]?.message}</p>
      )}
    </>
  );
};
export default RadioBoxes;
