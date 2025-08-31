import type { LicenseDea } from '@/types';
import { createColumnHelper } from '@tanstack/react-table';
import Cell from './cell';

const columnHelper = createColumnHelper<LicenseDea>();

export const columns = [
  columnHelper.accessor('name', {
    header: 'State',
  }),
  columnHelper.group({
    id: 'license',
    header: 'License',
    columns: [
      columnHelper.accessor((row) => row.license?.complete, {
        id: 'license_complete',
        header: 'Complete',
        cell: Cell,
      }),
      columnHelper.accessor((row) => row.license?.in_process, {
        id: 'license_in_process',
        header: 'In Process',
        cell: Cell,
      }),
    ],
  }),
  columnHelper.group({
    id: 'dea',
    header: 'DEA',
    columns: [
      columnHelper.accessor((row) => row.dea?.complete, {
        id: 'dea_complete',
        header: 'Complete',
        cell: Cell,
      }),
      columnHelper.accessor((row) => row.dea?.in_process, {
        id: 'dea_in_process',
        header: 'In Process',
        cell: Cell,
      }),
    ],
  }),
  columnHelper.group({
    id: 'practice_independently',
    header: 'Practice Independently',
    columns: [
      columnHelper.accessor((row) => row.practice_independently?.yes, {
        header: 'Yes',
        cell: Cell,
      }),
      columnHelper.accessor((row) => row.practice_independently?.no, {
        header: 'No',
        cell: Cell,
      }),
    ],
  }),
];
