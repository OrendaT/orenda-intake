import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

const Radios = ({
  name,
  options,
  className,
  disabled,
  required = true,
  errorMsg = 'This field is required',
  registerOptions,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {options.map((option) => (
        <div
          key={name + option}
          className={clsx(
            'flex items-center gap-2 font-medium ~text-sm/base',
            className,
          )}
        >
          <input
            id={name + option}
            className='peer size-4'
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

      {errors?.[name]?.message && (
        <p className='!mt-1 px-3 text-xs text-red-500'>
          {errors?.[name]?.message}
        </p>
      )}
    </>
  );
};
export default Radios;
