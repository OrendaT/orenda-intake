import FileInput from '@/components/ui/file-input';
import Input from '@/components/ui/input';
import { acceptForCredentialing } from '@/lib/constants';

const LicenseAndDea = () => {
  return (
    <fieldset className='fieldset'>
      <FileInput
        heading='Copy of PRIMARY STATE License'
        name='primary_state_license_doc'
        accept={acceptForCredentialing}
      />
      <Input label='PRIMARY STATE DEA Number' name='primary_state_dea_number' />
      <FileInput
        heading='Copy of PRIMARY STATE DEA'
        name='primary_state_dea_doc'
        accept={acceptForCredentialing}
      />
    </fieldset>
  );
};
export default LicenseAndDea;
