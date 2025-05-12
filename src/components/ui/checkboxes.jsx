import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

const Checkboxes = ({
  name,
  options,
  size,
  className,
  disabled,
  required = true,
  errorMsg,
  registerOptions,
  validations,
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
          className={clsx('flex items-center gap-2', className)}
        >
          <input
            id={name + option}
            className={clsx('peer flex-shrink-0', size)}
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
          <label htmlFor={name + option}>{option}</label>
        </div>
      ))}

      {errors?.[name]?.message && (
        <p className='error px-3'>{errors?.[name]?.message}</p>
      )}
    </>
  );
};
export default Checkboxes;
