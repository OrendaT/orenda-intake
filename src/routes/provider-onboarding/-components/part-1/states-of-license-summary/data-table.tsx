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
import type { LicenseDea } from '@/types';
import { nanoid } from 'nanoid';

interface DataTableProps {
  table: TTable<LicenseDea>;
  className?: string;
}

export default function DataTable({ table, className }: DataTableProps) {
  return (
    <Table className={cn('group', className)}>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow className='hover:bg-transparent' key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                !header.id.includes('table') && (
                  <TableHead
                    key={header.id + headerGroup.id}
                    colSpan={header.colSpan}
                  >
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
            >
              {row.getVisibleCells().map((cell) => {
                const id = nanoid();
                return (
                  <TableCell key={id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
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
