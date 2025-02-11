import PracticePolicy from '../components/policy/practice-policy';
import Terms from '../components/policy/terms-of-use';

const PolicyPage = () => {
  return (
    <section className='padding-inline py-20'>
      <div className='mx-auto max-w-xl'>
        <h1 className='mb-6 text-center font-heading font-bold ~text-2xl/4xl'>
          Terms of Use & Practice Policy
        </h1>

        <p className='text-center'>
          Welcome to Orenda Psychiatry. Your agreement to the following terms
          and conditions is required for you/your child to receive professional
          services from us.
        </p>

        <Terms />

        <PracticePolicy />
      </div>
    </section>
  );
};
export default PolicyPage;
