import SelectCheckboxes from '../ui/select-checkboxes';
import { useFormContext } from 'react-hook-form';
import IMask from '../ui/imask';
import Input from '../ui/input';
import Radios from '../ui/radios';

const LifestyleAndHealth = () => {
  const { watch } = useFormContext();
  const isHearingImpairments = watch('hearing_impairments?') === "Yes, I have a hearing impairment that does require accommodations.";


  return (
    <fieldset className='fieldse pt-7'>


      <section className='flex flex-col gap-8'>

        <div>
          <h3 className='label'>
            What is your level of education? Highest grade/degree and type of
            degree.&nbsp;<span className='text-red-500'>*</span>
          </h3>
          <Input
            hiddenLabel
            name='level_of_education'
            required={true}
            multiline
            rows={1.5}
            variant='outlined'
          />
        </div>

        <div>
          <h3 className='label'>
            What is your current occupation? What do you do? How long have you
            been doing it?&nbsp;<span className='text-red-500'>*</span>
          </h3>
          <Input
            hiddenLabel
            name='occupation_status'
            required={true}
            multiline
            rows={1.5}
            variant='outlined'
          />
        </div>



        <div>
          <h3 className='label'>
            Do you have any hearing impairments that would affect your
            participation in sessions or require accommodations?&nbsp;
            <span className='text-red-500'>*</span>
          </h3>
          <div className='grid grid-cols-2 gap-3'>
            <Radios
              name='hearing_impairments?'
              options={[
                'No, I do not have any hearing impairments.',
                'Yes, I have a hearing impairment that does require accommodations.',
              ]}
              required={true}
            />
          </div>

          {isHearingImpairments && (
            <div className='mt-4 p-3 border-l-4 border-gray-500 bg-gray-100 rounded'>
              <p className='text-gray-700 text-sm'>
                If you utilize an interpreter service due to a hearing impairment, rest assured that they can seamlessly join your video session using the same link provided to you. To enable this, simply initiate the process by granting permission within the messaging app on Doxy.me for your provider to invite your interpreter. Should you require further clarification or assistance, feel free to reach out to our intake department via Call, Text, or Email at (347) 707-7735 or intake@orendapsych.com.
              </p>
              <div className='mt-2'>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="acknowledgment"
                    className="w-4 h-4 accent-blue-500"
                  />
                  <label htmlFor="acknowledgment" className="text-sm text-gray-700">
                    I understand.
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        <Input
          label='What is your current weight?'
          name='current_weight'
          required={true}
        />

        <Input
          label='What is your height?'
          name='current_height'
          required={true}
        />

        <div>
          <h3 className='label'>
            What else would you like for your provider to know?
          </h3>
          <Input
            hiddenLabel
            name='extra_info_for_provider'
            multiline
            rows={1.5}
            required={false}
            variant='outlined'
          />
        </div>

        <div>
          <h3 className='label'>
            Who would you like us to contact in the event of an emergency? What
            is this person's relationship to you?&nbsp;
            <span className='text-red-500'>*</span>
          </h3>
          <Input
            hiddenLabel
            name='emergency_contact'
            required={true}
            variant='outlined'
          />
        </div>

        <IMask
          label='Emergency Contact Phone Number'
          name='emergency_contact_number'
          type='tel'
          mask='(999) 999-9999'
          required={true}
        />
      </section>
    </fieldset>
  );
};
export default LifestyleAndHealth;
