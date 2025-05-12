import { SuccessIcon } from '@/assets/svgs';
import Button from '@/components/ui/custom-button';
import { Link } from 'react-router';

const Success = () => {
  return (
    <main className='padding-inline'>
      <div className='flex flex-col items-center text-center ~pt-24/36'>
        <SuccessIcon className='mb-6 text-orenda-purple ~size-20/32' />

        <h1 className='auth_page_heading mb-6 ~text-xl/3xl'>
          Congratulations!
        </h1>

        <p className='mb-12 max-w-[23.5rem] ~text-sm/base'>
          Form has been submitted successfully.
        </p>

        <p className='mx-auto mb-6 max-w-md text-center ~text-sm/base'>
          We use billing partners including Headway to process billing and
          insurance claims. Please click below to go to Headway for Insurance
          In-Network acknowledgments
        </p>

        <Link
          className='flex w-2/3 max-w-64'
          to='https://headway.co/sign-up'
          target='_blank'
          rel='noreferrer noopener'
        >
          <Button
            className='max-w-64 border-orenda-green text-orenda-green'
            hoverClass='bg-orenda-green text-white'
          >
            Go to Headway
          </Button>
        </Link>
      </div>
    </main>
  );
};
export default Success;
