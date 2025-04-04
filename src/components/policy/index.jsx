import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Terms from './terms-of-use';
import PracticePolicy from './practice-policy';

const PolicyDialog = ({ children, ...props }) => {
  return (
    <AlertDialog {...props} >
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className='~px-5/10 ~py-8/12'>
        <AlertDialogHeader>
          <AlertDialogTitle className='mb-6 text-center font-heading font-bold ~text-2xl/4xl'>
            Terms of Use & Practice Policy
          </AlertDialogTitle>
          <AlertDialogDescription className='mb-6 text-center'>
            Welcome to Orenda Psychiatry. Your agreement to the following terms
            and conditions is required for you/your child to receive
            professional services from us.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div>
          <Terms />

          <PracticePolicy />
        </div>

        <AlertDialogFooter className='mt-10'>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PolicyDialog;
