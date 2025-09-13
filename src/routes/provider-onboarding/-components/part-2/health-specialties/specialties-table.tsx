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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          {ratings.map((heading, index) => (
            <TableHead key={index}>{heading}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ value: specialty }, index) => (
          <TableRow
            className='hover:bg-orenda-purple/5 transition-colors duration-150'
            key={specialty}
          >
            <TableCell className='text-left font-medium'>{specialty}</TableCell>
            {ratings.map((rating) => (
              <TableCell>
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
