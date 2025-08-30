import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { columns, data } from './columns';
import DataTable from './data-table';

const StatesOfLicenseSummary = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return <DataTable table={table} />;
};
export default StatesOfLicenseSummary;
