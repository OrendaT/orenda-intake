import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

const Checkboxes = ({
  name,
  options,
  size,
  className,
  disabled,
  required,
  errorMsg,
  pattern,
  minLength,
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
          className={clsx('flex items-center gap-2 text-sm', className)}
        >
          <input
            id={name + option}
            className={clsx('peer', size)}
            type='checkbox'
            value={option}
            {...register(name, {
              disabled: disabled,
              required: {
                value: required,
                message: errorMsg || 'This field is required',
              },
              pattern,
              minLength,
              validate: validations,
            })}
          />
          <label htmlFor={name + option}>{option}</label>
        </div>
      ))}

      {errors?.[name]?.message && (
        <p className='px-3 error'>{errors?.[name]?.message}</p>
      )}
    </>
  );
};
export default Checkboxes;
