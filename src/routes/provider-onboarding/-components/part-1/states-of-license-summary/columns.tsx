import { createColumnHelper } from '@tanstack/react-table';

type Status = 'complete' | 'in_process';

type LicenseDea = {
  name: string;
  license: Record<Status, boolean>;
  dea: Record<Status, boolean>;
  practice_independently: Record<'yes' | 'no', boolean>;
};

export const data: LicenseDea[] = [
  {
    name: 'NY',
    license: {
      complete: false,
      in_process: true,
    },
    dea: {
      complete: false,
      in_process: true,
    },
    practice_independently: {
      yes: true,
      no: false,
    },
  },
];

const columnHelper = createColumnHelper<LicenseDea>();

export const columns = [
  columnHelper.accessor('name', {
    header: 'State',
  }),
  columnHelper.group({
    id: 'license',
    header: 'License',
    columns: [
      columnHelper.accessor((row) => row.license.complete, {
        header: 'Complete',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor((row) => row.license.in_process, {
        header: 'In Process',
        cell: (info) => info.getValue(),
      }),
    ],
  }),
  columnHelper.group({
    id: 'dea',
    header: 'DEA',
    columns: [
      columnHelper.accessor((row) => row.dea.complete, {
        header: 'Complete',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor((row) => row.dea.in_process, {
        header: 'In Process',
        cell: (info) => info.getValue(),
      }),
    ],
  }),
  columnHelper.group({
    id: 'practice_independently',
    header: 'Practice Independently',
    columns: [
      columnHelper.accessor((row) => row.practice_independently.yes, {
        header: 'Yes',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor((row) => row.practice_independently.no, {
        header: 'No',
        cell: (info) => info.getValue(),
      }),
    ],
  }),
];
