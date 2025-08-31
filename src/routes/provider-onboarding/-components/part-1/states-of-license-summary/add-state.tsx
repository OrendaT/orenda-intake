import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { LuCirclePlus } from 'react-icons/lu';
import { useStates } from './states-context';

const AddState = () => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState('');

  const { setStates } = useStates();

  const submit = () => {
    setStates((prev) => [...prev, { name: state }]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='absolute right-1 bottom-5 size-fit scale-0 cursor-pointer opacity-0 transition-[transform_opacity] duration-200 group-hover:scale-100 group-hover:opacity-100'>
        <LuCirclePlus className='size-5' />
      </DialogTrigger>

      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-center'>
            Add Other State of License
          </DialogTitle>

          <DialogDescription className='text-center'>
            If you are licensed in any other state apart from the four listed,
            please specify below
          </DialogDescription>
        </DialogHeader>

        <TextField
          label='Name of State'
          variant='standard'
          name='state'
          fullWidth
          value={state}
          onChange={(event) => setState(event.target.value)}
          className='mt-2'
        />

        <Button
          className='mx-auto mt-5 flex px-6'
          type='button'
          onClick={submit}
        >
          Add
        </Button>
      </DialogContent>
    </Dialog>
  );
};
export default AddState;
