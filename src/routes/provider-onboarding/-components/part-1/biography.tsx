import FileInput from '@/components/ui/file-input';
import { acceptForCredentialing } from '@/lib/constants';

const Heading = ({ num }: { num: '1' | '2' }) => (
  <FileInput
    heading={`Headshot ${num}`}
    subheading={
      <>
        <p>
          Please provide a professional, high-quality image of yourself. Include
          one outdoor image with trees for marketing purposes.
        </p>
        <ul className='mt-2'>
          <li>Smile 😊 ✅</li>
          <li>Natural background with nature ✅</li>
          <li>No selfies ❌</li>
        </ul>
      </>
    }
    name={`headshot_${num}`}
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
);

const Biography = () => {
  return (
    <fieldset className='fieldset'>
      <h2 className='heading'>Biography</h2>

      <FileInput
        heading='Professional Statement'
        name='professional_statement'
        accept={acceptForCredentialing}
      />

      <Heading num='1' />
      <Heading num='2' />
    </fieldset>
  );
};
export default Biography;
