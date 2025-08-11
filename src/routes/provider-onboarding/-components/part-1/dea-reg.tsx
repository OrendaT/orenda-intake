import FileInput from '@/components/ui/file-input';
import Input from '@/components/ui/input';
import Radios from '@/components/ui/radios';
import { acceptForCredentialing, YES_NO } from '@/lib/constants';

const HiddenSection = () => (
  <div className='space-y-6'>
    <Input
      customLabel='If yes, please list the additional states where you hold DEA registrations along with the corresponding DEA numbers (e.g., NY DEA # XXXXX; CT DEA # XXXXX; MA DEA # XXXXX, etc.). If no, please indicate "N/A."'
      name='additional_dea_reg'
      hiddenLabel
    />

    <FileInput
      heading='Copy of Additional DEA'
      name='additional_dea_doc'
      accept={acceptForCredentialing}
    />
  </div>
);

const DeaReg = () => {
  return (
    <fieldset className='fieldset'>
      <Radios
        label='Do you hold DEA registration/s in any states other than your primary state of practice?'
        name='has_additional_dea_registrations'
        options={YES_NO}
        showHiddenSectionValue={0}
        hiddenSection={<HiddenSection />}
      />
    </fieldset>
  );
};
export default DeaReg;
