import type { LicenseDea } from '@/types';
import type { CellContext } from '@tanstack/react-table';
import { useFormContext } from 'react-hook-form';
import { LuCheck } from 'react-icons/lu';

const Cell = (info: CellContext<LicenseDea, unknown>) => {
  const { row: _row, column: _column } = info;
  const { register, watch, setValue } = useFormContext();

  const row = String(_row.getValue('name'));
  const parentColumn = _column.parent?.id;
  const column = _column.id.toLowerCase();

  const fieldName = `${row}_${parentColumn}`;
  const value = watch(fieldName);

  return (
    <label className='hover:bg-orenda-green/5 mx-auto grid size-6 w-full cursor-pointer place-items-center rounded border-dashed transition-colors duration-150'>
      {value?.[0] === column && <LuCheck className='size-5' />}

      <input
        {...register(fieldName)}
        type='checkbox'
        value={column}
        onClick={() => {
          setValue(fieldName, value?.[0] === column ? undefined : [column]);
        }}
        hidden
      />
    </label>
  );
};
export default Cell;
