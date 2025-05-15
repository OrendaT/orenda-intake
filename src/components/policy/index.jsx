import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Terms from './terms-of-use';
import PracticePolicy from './practice-policy';

const PolicyDialog = ({ children, ...props }) => {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='~px-5/10 ~pt-4/8 ~pb-8/12 scrollbar-none'>
        <DialogHeader>
          <DialogTitle className='text-center font-heading font-bold ~text-2xl/4xl ~mb-0/6'>
            Terms of Use & Practice Policy
          </DialogTitle>
          <DialogDescription className='text-center ~mb-0/6'>
            Welcome to Orenda Psychiatry. Your agreement to the following terms
            and conditions is required for you/your child to receive
            professional services from us.
          </DialogDescription>
        </DialogHeader>

        <>
          <Terms />

          <PracticePolicy />
        </>

        <DialogFooter className='mt-10'>
          <DialogClose
            className='rounded-md border px-4 py-1.5 font-medium ~text-sm/base'
            type='button'
          >
            Go to Submit
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PolicyDialog;
