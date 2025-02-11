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
          <div
            key={name + option}
            className={clsx(
              'flex items-center rounded-lg border border-[#C9C9C9] px-4 ~gap-2/4 ~py-[0.9rem]/4 hover:border-[#ecf5eb] hover:bg-[#ecf5eb]',
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
            <label className='w-full cursor-pointer' htmlFor={name + option}>
              {option}
            </label>
          </div>
        );
      })}

      {errors?.[name]?.message && (
        <p className='px-3 text-xs text-red-500'>{errors?.[name]?.message}</p>
      )}
    </>
  );
};

export default SelectCheckboxes;
