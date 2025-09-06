import type { LicenseDea } from '@/types';
import { createColumnHelper } from '@tanstack/react-table';
import Cell from './cell';
import AddState from './add-state';

const columnHelper = createColumnHelper<LicenseDea>();

export const columns = [
  columnHelper.group({
    id: 'table',
    columns: [
      columnHelper.accessor('name', {
        header: 'State',
      }),
      columnHelper.group({
        id: 'license',
        header: 'License',
        columns: [
          columnHelper.accessor((row) => row.license?.complete, {
            id: 'Complete',
            header: 'Complete',
            cell: Cell,
          }),
          columnHelper.accessor((row) => row.license?.in_process, {
            id: ' In Process',
            header: 'In Process',
            cell: Cell,
          }),
        ],
      }),
      columnHelper.group({
        id: 'DEA',
        header: 'DEA',
        columns: [
          columnHelper.accessor((row) => row.dea?.complete, {
            id: 'Complete',
            header: 'Complete',
            cell: Cell,
          }),
          columnHelper.accessor((row) => row.dea?.in_process, {
            id: 'In Process',
            header: 'In Process',
            cell: Cell,
          }),
        ],
      }),
      columnHelper.group({
        id: 'practice_ind',
        header: 'Practice Independently',
        columns: [
          columnHelper.accessor((row) => row.practice_independently?.yes, {
            id: 'Yes',
            header: 'Yes',
            cell: Cell,
          }),
          columnHelper.accessor((row) => row.practice_independently?.no, {
            id: 'No',
            header: 'No',
            cell: Cell,
          }),
        ],
      }),
    ],
    footer: () => <AddState />,
  }),
];
