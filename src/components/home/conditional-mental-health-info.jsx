import { useFormContext } from 'react-hook-form';
import Radios from '../ui/radios';
import { useMemo } from 'react';

const ConditionalMentalHealthInfo = () => {
  const { watch } = useFormContext();

  const showLastInput = useMemo(() => {
    const conditions = [
      watch('thoughts_and_behaviours_worsened_over_time') === 'Yes',
      watch('has_intrusive_thoughts') === 'Yes',
      watch('has_repetitive_behaviours') === 'Yes',
    ];

    return conditions.filter(Boolean).length >= 2;
  }, [
    watch('thoughts_and_behaviours_worsened_over_time'),
    watch('has_intrusive_thoughts'),
    watch('has_repetitive_behaviours'),
  ]);

  return (
    <div >
      <h3 className='label'>
        Our psychiatric providers stay up to date with the evolving landscape
        of the field, incorporating the latest research and innovative
        treatments. Some of our providers offer at-home ketamine-assisted
        therapy for patients who suffer from treatment-resistant mental health
        issues and meet the necessary criteria. If you are interested in
        learning more about at-home ketamine therapy, please let us know here:
      </h3>
      <div className='grid gap-3'>
        <Radios
          name='has_interest_in_ketamine_therapy'
          options={[
            'Yes, I am interested in learning about ketamine therapy',
            "No, I'm not open to ketamine therapy",
          ]}
        />
      </div>
    </div>
  );
};
export default ConditionalMentalHealthInfo;
