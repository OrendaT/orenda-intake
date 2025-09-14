import type {
  LicenseDea,
  ProviderOnboardingFormData as FormData,
} from '@/types';
import type { CellContext } from '@tanstack/react-table';
import { useFormContext } from 'react-hook-form';
import { LuCheck } from 'react-icons/lu';
import { statesOfLicenseOptions } from '../data';

const Cell = (info: CellContext<LicenseDea, unknown>) => {
  const { row: _row, column: _column } = info;
  const { register, watch, setValue } = useFormContext<FormData>();

  const row = _row.original.name;
  const parentColumn = _column.parent?.id;
  const columnValue = _column.id;

  const fieldName =
    `states_of_license_summary__${row}__${parentColumn}` as keyof FormData;

  const value = watch(fieldName);
  const selectedStates = watch('states_of_license') ?? [];
  const state = statesOfLicenseOptions.find(({ value }) =>
    value?.includes(row),
  )?.value;

  return (
    <label className='hover:bg-orenda-green/5 mx-auto grid size-6 w-full cursor-pointer place-items-center rounded border-dashed transition-colors duration-150'>
      {value === columnValue && <LuCheck className='size-5' />}

      <input
        {...register(fieldName)}
        type='radio'
        value={columnValue}
        onClick={(event) => {
          const target = event.target as HTMLInputElement;
          if (value && value === columnValue) {
            setValue(fieldName, '');
          }

          if (parentColumn === 'license' && state) {
            if (target.checked && columnValue === 'Complete') {
              setValue(
                'states_of_license',
                Array.from(new Set([...selectedStates, state])),
              );
            } else {
              setValue(
                'states_of_license',
                selectedStates.filter((value) => !value.includes(row)),
              );
              setValue(`states_of_license_summary__${row}__DEA`, '');
            }
          } else if (parentColumn === 'DEA' && state) {
            const isSelectedState = selectedStates?.includes(state);
            if (isSelectedState)
              if (target.checked && columnValue === 'Complete') {
                setValue(`states_of_license__${row}__has_DEA`, 'Yes');
              } else {
                setValue(`states_of_license__${row}__has_DEA`, 'No');
              }
          }
        }}
        hidden
      />
    </label>
  );
};
export default Cell;
