import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import { US_STATES } from '@/lib/constants';
import type { LicenseDea } from '@/types';
import { useStates } from '@/store/states-of-license-summary';

const AddState = () => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<LicenseDea['name']>();

  const addState = useStates((s) => s.addState);

  const submit = () => {
    if (state) addState({ name: state });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='flex w-full items-center justify-center gap-4'>
        <LuPlus className='size-5' /> Add State
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

        <FormControl fullWidth variant='standard'>
          <InputLabel>Name of State</InputLabel>
          <Select
            name='state'
            value={state}
            variant='standard'
            fullWidth
            onChange={(event) => setState(event.target.value)}
            MenuProps={{
              className: 'pointer-events-auto',
            }}
          >
            {US_STATES.filter(({ code }) => {
              const hiddenStates = ['NY', 'MA', 'CT', 'NJ'];
              return !hiddenStates.includes(code);
            }).map(({ value, code }) => (
              <MenuItem key={code} value={code}>
                {`${value} (${code})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
