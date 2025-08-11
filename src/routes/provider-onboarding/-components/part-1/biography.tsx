import FileInput from '@/components/ui/file-input';
import { acceptForCredentialing } from '@/lib/constants';

const Biography = () => {
  return (
    <fieldset className='fieldset'>
      <h2 className='heading'>Biography</h2>

      <FileInput
        heading='Professional Statement'
        name='professional_statement'
        accept={acceptForCredentialing}
      />

      <FileInput
        heading='Headshot 1'
        subheading='Please provide a professional, high-quality images. Include one
          outdoor image with trees for marketing purposes.'
        name='headshot_1'
        label={
          <>
            Jpeg or Png (nice smile,{' '}
            <strong>
              NO selfies, NO formal attire, NATURAL BACKGROUND PREFERRED.
              Square/landscape shape, NOT round.)
            </strong>
          </>
        }
        accept='image/jpeg,image/png'
      />

      <FileInput
        heading='Headshot 2'
        subheading='Please provide a professional, high-quality images. Include one
          outdoor image with trees for marketing purposes.'
        name='headshot_2'
        label={
          <>
            Jpeg or Png (nice smile,{' '}
            <strong>
              NO selfies, NO formal attire, NATURAL BACKGROUND PREFERRED.
              Square/landscape shape, NOT round.)
            </strong>
          </>
        }
        accept='image/jpeg,image/png'
      />
    </fieldset>
  );
};
export default Biography;
