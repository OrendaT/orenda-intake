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
        <Link className='mx-auto block w-full max-w-72' to='/'>
          <Button>Home page</Button>
        </Link>
      </div>
    </main>
  );
};
export default Success;
