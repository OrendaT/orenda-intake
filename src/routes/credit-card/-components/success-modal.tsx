import { XIcon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../../components/ui/alert-dialog';
import { SuccessIcon } from '@/assets/svgs';

const SuccessModal = ({ open }: { open: boolean }) => {
  const close = () => location.reload();
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader className='sr-only'>
          <AlertDialogTitle> Congratulations!</AlertDialogTitle>
          <AlertDialogDescription>
            Form has been submitted successfully.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogCancel
          onClick={close}
          className='absolute top-4 right-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-zinc-100 data-[state=open]:text-zinc-500 dark:ring-offset-zinc-950 dark:focus:ring-zinc-300 dark:data-[state=open]:bg-zinc-800 dark:data-[state=open]:text-zinc-400'
        >
          <XIcon className='size-6' />
          <span className='sr-only'>Close</span>
        </AlertDialogCancel>

        <div className='flex flex-col items-center py-8 text-center'>
          <SuccessIcon className='text-orenda-purple clamp-[size,20,32] mb-6' />

          <h1 className='clamp-[text,xl,3xl] mb-6 font-semibold'>Thank you!</h1>

          <p className='clamp-[mb,8,12] clamp-[text,base,lg] max-w-[23.5rem] font-medium'>
            Form has been submitted successfully.
          </p>

          <p className='clamp-[text,sm,base] mx-auto mb-6 max-w-md text-center'>
            Our team will reach out to you soon.
          </p>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default SuccessModal;
