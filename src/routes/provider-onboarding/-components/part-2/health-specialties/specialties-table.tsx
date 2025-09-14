import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mentalHealthSpecializations as rows } from '../data';
import { useFormContext } from 'react-hook-form';
import type { ProviderOnboardingFormData } from '@/types';

const ratings = ['1', '2', '3', '4'];

const SpecialtiesTable = () => {
  const { register } = useFormContext<ProviderOnboardingFormData>();

  return (
    <Table className='border-separate border-spacing-y-1 border-none'>
      <TableHeader>
        <TableRow className=''>
          <TableHead className='h-5 border-x-0 border-t-0 border-b'></TableHead>
          {ratings.map((heading, index) => (
            <TableHead
              className='text-primary h-5 border-x-0 border-t-0 border-b'
              key={index}
            >
              {heading}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ value: specialty }, index) => (
          <TableRow
            className='bg-lavender-mist/15 hover:bg-lavender-mist/30 border-none transition-colors duration-150'
            key={specialty}
          >
            <TableCell className='rounded-l border-none py-2 text-left font-medium'>
              {specialty}
            </TableCell>
            {ratings.map((rating) => (
              <TableCell className='border-none last:rounded-e'>
                <label className='block px-4 pt-1'>
                  <input
                    type='radio'
                    value={`${specialty}, ${rating}`}
                    {...register(`health_conditions[${index}]`)}
                  />
                </label>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default SpecialtiesTable;
