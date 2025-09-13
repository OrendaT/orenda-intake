import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { columns } from './columns';
import DataTable from './data-table';
import { useStates } from './states-context';

const StatesOfLicenseSummary = () => {
  const { states: data } = useStates();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <p>
        As a summary, please illustrate your License and DEA Status Below. Feel
        free to indicate any additional NP licenses you may have in other
        states:
      </p>
      <DataTable table={table} />
    </>
  );
};
export default StatesOfLicenseSummary;

// In all honesty, the use of tanstack table in creating
// this table was not necessary, and it could've been
// built without it. unfortunately what has been done
// has been done, and it's not broken...
