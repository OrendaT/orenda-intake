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
import { useStates } from './states-context';

const US_STATES = [
  { label: 'Alabama (AL)', value: 'AL' },
  { label: 'Alaska (AK)', value: 'AK' },
  { label: 'Arizona (AZ)', value: 'AZ' },
  { label: 'Arkansas (AR)', value: 'AR' },
  { label: 'California (CA)', value: 'CA' },
  { label: 'Colorado (CO)', value: 'CO' },
  { label: 'Delaware (DE)', value: 'DE' },
  { label: 'Florida (FL)', value: 'FL' },
  { label: 'Georgia (GA)', value: 'GA' },
  { label: 'Hawaii (HI)', value: 'HI' },
  { label: 'Idaho (ID)', value: 'ID' },
  { label: 'Illinois (IL)', value: 'IL' },
  { label: 'Indiana (IN)', value: 'IN' },
  { label: 'Iowa (IA)', value: 'IA' },
  { label: 'Kansas (KS)', value: 'KS' },
  { label: 'Kentucky (KY)', value: 'KY' },
  { label: 'Louisiana (LA)', value: 'LA' },
  { label: 'Maine (ME)', value: 'ME' },
  { label: 'Maryland (MD)', value: 'MD' },
  { label: 'Michigan (MI)', value: 'MI' },
  { label: 'Minnesota (MN)', value: 'MN' },
  { label: 'Mississippi (MS)', value: 'MS' },
  { label: 'Missouri (MO)', value: 'MO' },
  { label: 'Montana (MT)', value: 'MT' },
  { label: 'Nebraska (NE)', value: 'NE' },
  { label: 'Nevada (NV)', value: 'NV' },
  { label: 'New Hampshire (NH)', value: 'NH' },
  { label: 'New Mexico (NM)', value: 'NM' },
  { label: 'North Carolina (NC)', value: 'NC' },
  { label: 'North Dakota (ND)', value: 'ND' },
  { label: 'Ohio (OH)', value: 'OH' },
  { label: 'Oklahoma (OK)', value: 'OK' },
  { label: 'Oregon (OR)', value: 'OR' },
  { label: 'Pennsylvania (PA)', value: 'PA' },
  { label: 'Rhode Island (RI)', value: 'RI' },
  { label: 'South Carolina (SC)', value: 'SC' },
  { label: 'South Dakota (SD)', value: 'SD' },
  { label: 'Tennessee (TN)', value: 'TN' },
  { label: 'Texas (TX)', value: 'TX' },
  { label: 'Utah (UT)', value: 'UT' },
  { label: 'Vermont (VT)', value: 'VT' },
  { label: 'Virginia (VA)', value: 'VA' },
  { label: 'Washington (WA)', value: 'WA' },
  { label: 'West Virginia (WV)', value: 'WV' },
  { label: 'Wisconsin (WI)', value: 'WI' },
  { label: 'Wyoming (WY)', value: 'WY' },
];

const AddState = () => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState('');

  const { setStates } = useStates();

  const submit = () => {
    if (state)
      setStates((prev) => {
        const hasState = prev.find((s) => s.name === state);
        return hasState ? prev : [...prev, { name: state }];
      });
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
            {US_STATES?.map(({ label, value }) => (
              <MenuItem key={value} value={value}>
                {label}
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
