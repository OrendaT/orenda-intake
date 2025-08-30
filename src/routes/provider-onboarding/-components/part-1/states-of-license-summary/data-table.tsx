import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { flexRender, type Table as TTable } from '@tanstack/react-table';
import { cn } from '@/lib/utils';

interface DataTableProps<T = unknown> {
  table: TTable<T>;
  className?: string;
}

export default function DataTable<T>({ table, className }: DataTableProps<T>) {
  return (
    <>
      <Table className={cn(className)}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className='hover:bg-transparent' key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
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
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </>
  );
}
