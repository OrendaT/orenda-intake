import { cn } from '@/lib/utils';
import { useFormState } from 'react-hook-form';

const ErrorMessage = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  const { errors } = useFormState();

  return (
    errors?.[name]?.message && (
      <p className={cn('error', className)}>
        {errors?.[name]?.message.toString()}
      </p>
    )
  );
};
export default ErrorMessage;
