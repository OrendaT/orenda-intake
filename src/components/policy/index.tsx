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

const PolicyDialog = ({
  children,
  ...props
}: React.ComponentProps<typeof Dialog>) => {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='clamp-[px,5,10] clamp-[pt,4,8] clamp[pb,8,12] scrollbar-none'>
        <DialogHeader>
          <DialogTitle className='font-heading !clamp-[text,xl,3xl] mt-6 clamp[mb,0,6] text-center font-bold'>
            Terms of Use & Practice Policy
          </DialogTitle>
          <DialogDescription className='clamp[mb,0,6] text-center'>
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
            className='clamp-[text,sm,base] rounded-md border px-4 py-1.5 font-medium'
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
