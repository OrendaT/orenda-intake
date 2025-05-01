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
import { ArrowDown } from 'lucide-react';
import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { policy_signatures } from '@/lib/definitions';
import { cn } from '@/lib/utils';

const PolicyDialog = ({ children, ...props }) => {
  const content = useRef();

  const { watch, setValue } = useFormContext();

  const signatureFields = watch(policy_signatures);

  const allowSubmit = signatureFields.every((field) => !!field.base64);

  const scrollDown = () => {
    const dialogContent = content.current;

    if (dialogContent) {
      const signatureElements = [
        ...dialogContent.querySelectorAll('.signature'),
      ];
      const currentScrollTop = dialogContent.scrollTop;

      // Find the first signature element that is *below* the current scroll
      const nextSignature = signatureElements.find((el) => {
        const elTop = el.offsetTop;
        return elTop > currentScrollTop + 160; // +10 for slight tolerance
      });

      if (nextSignature) {
        dialogContent.scrollTo({
          top: nextSignature.offsetTop - 150, // Adjust for a little padding if needed
          behavior: 'smooth',
        });
      }
    }
  };

  const onClick = () => {
    setValue('policy_agreement', 'I agree');
  };

  const scrollTop = () => {
    const dialogContent = content.current;
    if (dialogContent) {
      dialogContent.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const height = content.current
    ? content.current.scrollHeight / (content.current.offsetTop || 1)
    : 0;

  return (
    <>
      <AlertDialog {...props}>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent
          ref={content}
          className='~px-5/10 ~pt-4/8 ~pb-8/12 scrollbar-none'
        >
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center font-heading font-bold ~text-2xl/4xl ~mb-0/6'>
              Terms of Use & Practice Policy
            </AlertDialogTitle>
            <AlertDialogDescription className='text-center ~mb-0/6'>
              Welcome to Orenda Psychiatry. Your agreement to the following
              terms and conditions is required for you/your child to receive
              professional services from us.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div>
            <Terms />

            <PracticePolicy />
          </div>

          <AlertDialogFooter
            className={cn('mt-10', {
              'sm:items-center sm:justify-between gap-5': !allowSubmit,
            })}
          >
            {!allowSubmit && (
              <>
                <button
                  className='rounded border px-3 py-1.5 text-sm font-medium'
                  onClick={scrollTop}
                  type='button'
                >
                  Back to Top
                </button>

                <p className='error mt-0 text-center'>
                  Please sign where required to proceed
                </p>
              </>
            )}
            <AlertDialogCancel
              onClick={onClick}
              disabled={!allowSubmit}
              type='button'
            >
              Go to Submit
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {props.open && (
        <div className='pointer-events-auto fixed bottom-10 right-1/2 z-[51] flex w-[calc(100%-2rem)] max-w-3xl translate-x-1/2 items-center justify-end pe-4'>
          <button
            onClick={scrollDown}
            type='button'
            className='animate-bounce cursor-pointer'
          >
            <ArrowDown className='size-8' />
          </button>
        </div>
      )}
    </>
  );
};

export default PolicyDialog;
