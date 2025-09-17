import Checkboxes from '@/components/ui/checkboxes';
import DatePicker from '@/components/ui/date-picker';
import FileInput from '@/components/ui/file-input';
import Input from '@/components/ui/input';
import Radios from '@/components/ui/radios';
import { programs } from './data';
import { YES_NO } from '@/lib/constants';
import type { NursingDegree } from '@/types';

const HiddenSection = ({ abbr }: { abbr: NursingDegree }) => {
  return (
    <>
      <Input
        containerClassName='mb-3'
        label='Institution'
        name={`nursing_degrees__${abbr}__institution`}
        size='small'
      />
      <div className='mb-3 flex w-full flex-col items-start gap-x-10 gap-y-3 *:w-full sm:flex-row'>
        <DatePicker
          label='Start Date'
          name={`nursing_degrees__${abbr}__start_date`}
          format='MM/yyyy'
        />

        <DatePicker
          label='End Date'
          name={`nursing_degrees__${abbr}__end_date`}
          format='MM/yyyy'
        />
      </div>
    </>
  );
};

const ProgramsCOI = () => {
  const options = programs.map(({ label, value, abbr }) => ({
    label,
    value,
    hiddenSection: value && abbr && <HiddenSection abbr={abbr} />,
  }));

  return (
    <fieldset className='fieldset'>
      <Checkboxes
        label=' Please provide program information with start and end dates'
        name='nursing_degrees'
        className='sm:grid-cols-1'
        options={options}
        hiddenSectionClassName='pb-1'
      />

      <Radios
        label='Do you have COI coverage?'
        name='COI_coverage'
        options={YES_NO}
        showHiddenSectionValue={0}
        required={false}
        hiddenSection={
          <FileInput heading='Please upload' name='COI_coverage_doc' />
        }
      />
    </fieldset>
  );
};
export default ProgramsCOI;
