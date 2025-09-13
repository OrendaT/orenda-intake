import SelectCheckboxes from '@/components/ui/select-checkboxes';
import { mentalHealthIssues } from '../data';
import RequiredMark from '@/components/ui/required-mark';
import SpecialtiesTable from './specialties-table';

const HealthSpecialties = () => {
  return (
    <fieldset className='fieldset'>
      <SelectCheckboxes
        label='Please choose your top 3 specialties'
        name='health_conditions'
        options={mentalHealthIssues}
        validations={{
          oneMore: (value) =>
            value.length > 3 || 'Please select at least one more',
        }}
      />

      <hr className='mt-5 border-[#B2B2B2]' />

      <h3 className='label'>
        Please state your comfort level in handling each of these issues on a
        scale of 1 to 4
        <RequiredMark />
      </h3>

      <p className='-mt-6 text-sm'>
        (1 = Least comfortable, 4 = Very comfortable)
      </p>

      <SpecialtiesTable />
    </fieldset>
  );
};

export default HealthSpecialties;
