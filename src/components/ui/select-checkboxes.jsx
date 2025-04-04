import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

const SelectCheckboxes = ({
  options,
  name,
  className,
  required = true,
  disabled,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {options.map((option) => {
        return (
          <label
            key={name + option}
            className={clsx(
              'flex cursor-pointer items-center rounded-lg border border-[#C9C9C9] px-4 ~gap-2/4 ~py-[0.9rem]/4 hover:border-[#ecf5eb] hover:bg-[#ecf5eb]',
              className,
            )}
          >
            <input
              className='rounded-sm border border-[#C9C9C9] ~size-4/5'
              type='checkbox'
              value={option}
              id={name + option}
              {...register(name, {
                required: {
                  value: required,
                  message: 'Please select at least one',
                },
                disabled: disabled,
              })}
            />
            <span>{option}</span>
          </label>
        );
      })}

      {errors?.[name]?.message && (
        <p className='error mt-0 px-3'>{errors?.[name]?.message}</p>
      )}
    </>
  );
};

export default SelectCheckboxes;
