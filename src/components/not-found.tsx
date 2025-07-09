import Button from '@/components/ui/custom-button';
import { useNavigate, type NotFoundRouteProps } from '@tanstack/react-router';

const NotFound = (props: NotFoundRouteProps) => {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) {
      navigate({ to: '.' });
    } else {
      navigate({ to: '/' });
    }
  };

  console.log(props.data);

  return (
    <div className='flex h-dvh flex-col items-center justify-center px-5 text-center'>
      <h1 className='clamp-[text,3xl,4xl] font-heading mb-6 font-bold text-gray-800'>
        Page Not Found
      </h1>
      <p className='mb-8 text-gray-600'>
        The page you're looking for doesn't exist.
      </p>

      <p>Data: {JSON.stringify(props.data)}</p>

      <Button className='w-fit px-12' onClick={goBack}>
        Go Back
      </Button>
    </div>
  );
};

export default NotFound;
