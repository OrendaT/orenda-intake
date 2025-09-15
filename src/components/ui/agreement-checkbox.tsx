import { useFormContext } from 'react-hook-form';
import { cn } from '../../lib/utils';
import type { InputProps } from '@/types';
import ErrorMessage from './error-message';

const AgreementCheckbox = ({
  label,
  name,
  errorMsg,
  className,
  registerOptions,
}: InputProps) => {
  const {
    register,
  } = useFormContext();
  return (
    <div>
      <label
        className={cn(
          'flex items-center gap-2 text-sm leading-none text-gray-700',
          className,
        )}
      >
        <input
          type='checkbox'
          className='size-3.5'
          value={label?.toString()}
          {...register(name, {
            required: errorMsg,
            ...registerOptions,
          })}
        />
        {label}
      </label>

      <ErrorMessage name={name} className='px-3'/>
    </div>
  );
};
export default AgreementCheckbox;
