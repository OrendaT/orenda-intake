import FileInput from '@/components/ui/file-input';
import Input from '@/components/ui/input';
import Radios from '@/components/ui/radios';
import { acceptForCredentialing, YES_NO } from '@/lib/constants';

const HiddenSection = () => (
  <div className='space-y-6'>
    <Input
      customLabel='Please list the additional states where you hold NP licenses along with the corresponding license numbers (e.g., NY License # XXXXX; CT License # XXXXX; MA License # XXXXX, etc.).'
      name='additional_np_licenses'
      hiddenLabel
    />

    <FileInput
      heading='Copy of Additional State License'
      name='additional_state_license_doc'
      accept={acceptForCredentialing}
    />
  </div>
);

const NPLicenses = () => {
  return (
    <fieldset className='fieldset'>
      <Radios
        label='Do you hold any additional NP licenses in states other than your PRIMARY STATE of practice?'
        name='has_additional_np_licenses'
        options={YES_NO}
        showHiddenSectionValue={0}
        hiddenSection={<HiddenSection />}
      />
    </fieldset>
  );
};
export default NPLicenses;
