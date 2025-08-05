import FileInput from '@/components/ui/file-input';
import Input from '@/components/ui/input';
import RequiredMark from '../../../components/ui/required-mark';

const InsuranceDetails = () => {
  return (
    <>
      <h2 className='legend'>Insurance & Payment Info</h2>

      <fieldset className='fieldset'>
        <div className='clamp-[gap,4,6] grid sm:grid-cols-2'>
          <Input
            label='Insurance Member ID'
            name='insurance_id'
            sx={{ marginBlockStart: 1 }}
          />
          <Input
            label={
              <>
                Insurance Provider{' '}
                <small>(Aetna, Cigna, Blue Cross, United etc.)</small>
              </>
            }
            name='insurance_provider'
            sx={{ marginBlockStart: 1 }}
            helperText='Please note that we are not currently in-network with any Medicaid/Medicare plans.
'
          />
        </div>

        <div>
          <h3 className='label'>
            Please upload images of your insurance card
            <RequiredMark />
          </h3>
          <p className='text-sm'>
            If you do not have insurance, please upload a screenshot of this or
            some other file as you must upload something to proceed.
          </p>
        </div>
        <div className='clamp-[gap,4,6] grid'>
          <FileInput
            label='Upload The Front of your Insurance card'
            name='insurance_card_front'
          />
          <FileInput
            label='Upload The Back of your Insurance card'
            name='insurance_card_back'
          />
        </div>

        <div className='!mt-8'>
          <h3 className='label'>
            Please upload a copy of a government or school-issued photo ID.{' '}
          </h3>
          <FileInput label='Photo ID' name='photo_ID' required={false} />
        </div>
      </fieldset>
    </>
  );
};
export default InsuranceDetails;
