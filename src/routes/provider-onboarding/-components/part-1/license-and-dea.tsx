import FileInput from '@/components/ui/file-input';
import Input from '@/components/ui/input';

const LicenseAndDea = () => {
  return (
    <fieldset className='fieldset'>
      <FileInput
        heading='Copy of PRIMARY STATE License'
        name='primary_state_license'
      />
      <Input label='PRIMARY STATE DEA Number' name='primary_state_dea' />
      <FileInput
        heading='Copy of PRIMARY STATE DEA'
        name='primary_state_dea_copy'
      />
    </fieldset>
  );
};
export default LicenseAndDea;
