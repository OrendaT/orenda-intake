import Input from '@/components/ui/input';

const CAQH = () => {
  return (
    <fieldset className='fieldset'>
      <h2 className='heading'>
        Make sure your username and password are valid for this session.
      </h2>

      <Input name='CAQH_number' label='CAQH Number' />
      <Input name='CAQH_username' label='CAQH Username' />
      <Input name='CAQH_password' label='CAQH Password' type='password' />
      <Input name='NPI_number' label='NPI Number' />
    </fieldset>
  );
};
export default CAQH;
