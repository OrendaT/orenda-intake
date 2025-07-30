import FileInput from '@/components/ui/file-input';
import Input from '@/components/ui/input';
import Radios from '@/components/ui/radios';
import { YES_NO } from '@/lib/constants';

const HiddenSection = () => (
  <div className='space-y-6'>
    <Input label='Please list them' name='additional_qualifications_list' />

    <FileInput
      heading='Copy of Additional qualification/certifications:'
      name='additional_qualifications_copy'
    />
  </div>
);

const AdditionalQualifications = () => {
  return (
    <fieldset className='fieldset'>
      <Radios
        label='Do you have any additional qualifications such as FNP, Primary Care NP, Acute Care NP, etc.?'
        name='additional_qualifications'
        options={YES_NO}
        showHiddenSectionValue={0}
        hiddenSection={<HiddenSection />}
      />
    </fieldset>
  );
};
export default AdditionalQualifications;
