import Checkboxes from '@/components/ui/checkboxes';
import DatePicker from '@/components/ui/date-picker';
import FileInput from '@/components/ui/file-input';
import Input from '@/components/ui/input';
import Radios from '@/components/ui/radios';
import { programs } from './data';
import { YES_NO } from '@/lib/constants';

const HiddenSection = ({ abbr }: { abbr: string }) => {
  return (
    <>
      <Input
        containerClassName='mb-3'
        label='Institution'
        name={`${abbr}_institution`}
        size='small'
      />
      <div className='mb-3 flex w-full flex-col items-start gap-x-10 gap-y-3 *:w-full sm:flex-row'>
        <DatePicker
          label='Start Date'
          name={`${abbr}_highest_nursing_degree_start_date`}
          format='MM/yyyy'
        />

        <DatePicker
          label='End Date'
          name={`${abbr}_highest_nursing_degree_send_date`}
          format='MM/yyyy'
        />
      </div>
    </>
  );
};

const ProgramsCOI = () => {
  const options = programs.map(({ value, abbr }) => ({
    value,
    hiddenSection: value !== 'N/A' && <HiddenSection abbr={abbr} />,
  }));

  return (
    <fieldset className='fieldset'>
      <Checkboxes
        label=' Please provide program information with start and end dates'
        name='highest_nursing_degree'
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
