import Input from '../ui/input';
import Radios from '../ui/radios';

const MentalIllnessHistory = () => {
  return (
    <fieldset className='fieldset'>
      <h2 className='legend'>Mental Illness History</h2>

      <section className='fieldset-section'>
        <div>
          <h3 className='label'>
            Do you have current suicidal thoughts? If you have current suicidal
            thoughts, please immediately contact 9 1 1 or go to your nearest
            emergency room; or contact the National Suicide Prevention Hotline
            at: 1-800-273-8255.&nbsp;<span className='text-red-500'>*</span>
          </h3>
          <div className='flex items-center ~gap-5/7'>
            <Radios
              name='suicidal_thoughts?'
              options={['Yes', 'No']}
              required={true}
            />
          </div>
        </div>
      </section>
    </fieldset>
  );
};
export default MentalIllnessHistory;