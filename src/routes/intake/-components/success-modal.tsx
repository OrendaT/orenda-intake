import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../../components/ui/alert-dialog';
import { SuccessIcon } from '@/assets/svgs';
import Button from '../../../components/ui/custom-button';

const SuccessModal = ({ open }: { open: boolean }) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader className='sr-only'>
          <AlertDialogTitle> Congratulations!</AlertDialogTitle>
          <AlertDialogDescription>
            Form has been submitted successfully.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className='flex flex-col items-center py-8 text-center'>
          <SuccessIcon className='text-orenda-purple clamp-[size,20,32] mb-6' />

          <h1 className='clamp-[text,xl,3xl] mb-6 font-semibold'>
            You're Almost Done!
          </h1>

          <p className='mb-8 clamp-[text,base,lg] max-w-[23.5rem] font-medium'>
            Your intake form has been submitted successfully.
          </p>

          <p className='clamp-[text,sm,base] mx-auto mb-6 max-w-md text-center'>
            We use billing partners including Headway to process billing and
            insurance claims. Please click below to go to Headway for Insurance
            In-Network acknowledgments
          </p>

          <a
            className='flex w-2/3 max-w-64'
            href='https://headway.co/sign-up'
            target='_blank'
            rel='noreferrer noopener'
          >
            <Button
              className='border-orenda-green text-orenda-green max-w-64'
              hoverClass='bg-orenda-green text-white'
            >
              Go to Headway
            </Button>
          </a>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default SuccessModal;
