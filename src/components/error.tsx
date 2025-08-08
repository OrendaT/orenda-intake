import Button from '@/components/ui/custom-button';
import { type ErrorComponentProps } from '@tanstack/react-router';

const Error = (props: ErrorComponentProps) => {
  console.log(props);

  return (
    <div className='flex h-dvh flex-col items-center justify-center px-5 text-center'>
      <h1 className='clamp-[text,3xl,4xl] font-heading mb-6 font-bold text-gray-800'>
        An Error Occurred
      </h1>
      <p className='mb-8 text-gray-600'>
        {props.error.name}: {props.error.message}
      </p>

      <p className='mx-auto mb-8 line-clamp-5 max-w-lg text-gray-600'>
        Error stack: {props.error?.stack}
      </p>

      <Button
        className='w-fit px-12'
        onClick={() => location.reload()}
      >
        Refresh Page
      </Button>
    </div>
  );
};

export default Error;
