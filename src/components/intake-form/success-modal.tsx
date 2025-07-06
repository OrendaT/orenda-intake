import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { SuccessIcon } from "@/assets/svgs";
import Button from "../ui/custom-button";

const SuccessModal = ({ open }: { open: boolean }) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader className="sr-only">
          <AlertDialogTitle> Congratulations!</AlertDialogTitle>
          <AlertDialogDescription>
            Form has been submitted successfully.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col items-center py-8 text-center">
          <SuccessIcon className="mb-6 text-orenda-purple clamp-[size,20,32]" />

          <h1 className="font-semibold mb-6 clamp-[text,xl,3xl]">
            Congratulations!
          </h1>

          <p className="clamp-[mb,8,12] font-medium max-w-[23.5rem] clamp-[text,base,lg]">
            Form has been submitted successfully.
          </p>

          <p className="mx-auto mb-6 max-w-md text-center clamp-[text,sm,base]">
            We use billing partners including Headway to process billing and
            insurance claims. Please click below to go to Headway for Insurance
            In-Network acknowledgments
          </p>

          <a
            className="flex w-2/3 max-w-64"
            href="https://headway.co/sign-up"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Button
              className="max-w-64 border-orenda-green text-orenda-green"
              hoverClass="bg-orenda-green text-white"
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
