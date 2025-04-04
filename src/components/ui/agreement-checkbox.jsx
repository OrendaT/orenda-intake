import { useFormContext } from 'react-hook-form';
import { cn } from '../../lib/utils';

const AgreementCheckbox = ({ label, name, errorMsg, className }) => {
  const { register } = useFormContext();
  return (
    <label
      className={cn('flex items-center gap-2 text-sm text-gray-700', className)}
    >
      <input
        type='checkbox'
        className='size-4'
        {...register(name, {
          required: errorMsg,
        })}
      />
      {label}
    </label>
  );
};
export default AgreementCheckbox;
