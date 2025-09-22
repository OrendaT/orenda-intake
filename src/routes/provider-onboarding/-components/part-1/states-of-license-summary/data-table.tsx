import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { flexRender, type Table as TTable } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { nanoid } from 'nanoid';
import { LuX } from 'react-icons/lu';
import { useStates } from '@/store/states-of-license-summary';
import { LDStates } from '@/lib/definitions';
import type { LicenseDea } from '@/types';

interface DataTableProps {
  table: TTable<LicenseDea>;
  className?: string;
}

const originalStates = LDStates.map((state) => state.name);

export default function DataTable({ table, className }: DataTableProps) {
  const removeState = useStates((s) => s.removeState);

  const deleteRow = (name: LicenseDea['name']) => {
    removeState(name);
  };

  return (
    <Table className={cn(className)}>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow className='hover:bg-transparent' key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const id = nanoid();
              return (
                !header.id.includes('table') && (
                  <TableHead key={id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                )
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {
          // Show actual data rows
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
              className='relative'
            >
              {row.getVisibleCells().map((cell) => {
                const id = nanoid();
                return (
                  <TableCell key={id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}

              {!originalStates.includes(row.original.name) && (
                <button
                  type='button'
                  className='text-error-red absolute top-0.5 right-0.5 grid size-4 cursor-pointer place-items-center rounded-full border'
                  onClick={() => deleteRow(row.original.name)}
                >
                  <LuX className='size-3' />
                </button>
              )}
            </TableRow>
          ))
        }
      </TableBody>
      <TableFooter>
        {table.getFooterGroups().map((footerGroup) => (
          <TableRow className='hover:bg-transparent' key={footerGroup.id}>
            {footerGroup.headers.map((header) => {
              return (
                header.id.includes('table') && (
                  <TableHead
                    key={header.id + footerGroup.id}
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext(),
                        )}
                  </TableHead>
                )
              );
            })}
          </TableRow>
        ))}
      </TableFooter>
    </Table>
  );
}
