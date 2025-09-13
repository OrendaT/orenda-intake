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
  const { register, watch } = useFormContext<ProviderOnboardingFormData>();

  console.log(watch('health_specialties'));

  return (
    <Table className='border-none border-spacing-y-1 border-separate'>
      <TableHeader>
        <TableRow className=''>
          <TableHead className='border-b border-x-0 border-t-0 h-5'></TableHead>
          {ratings.map((heading, index) => (
            <TableHead className='border-b border-x-0 border-t-0 h-5 text-primary' key={index}>{heading}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ value: specialty }, index) => (
          <TableRow
            className='bg-lavender-mist/15 border-none hover:bg-lavender-mist/30 transition-colors duration-150'
            key={specialty}
          >
            <TableCell className='text-left font-medium border-none py-2 rounded-l'>{specialty}</TableCell>
            {ratings.map((rating) => (
              <TableCell className='border-none last:rounded-e'>
                <label className='block px-4'>
                  <input
                    type='radio'
                    value={`${specialty}, ${rating}`}
                    {...register(`health_specialties[${index}]`)}
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
