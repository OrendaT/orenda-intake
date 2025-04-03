import { FormProvider, useForm } from 'react-hook-form';
import PatientsDetails from '../components/home/patients-details';
import InsuranceAndPayment from '../components/home/insurance_and_payment';
import { Link } from 'react-router-dom';

import { sendToMail } from '../services/email';

const Home = () => {
  const methods = useForm();
  const { handleSubmit, register, watch } = methods;

  const onSubmit = async (data) => {
    sendToMail(data);
  };

  const acceptedTerms = watch('terms_and_conditions');

  return (
    <main className='padding-inline bg-dotted-purple py-16'>
      <div className='mx-auto max-w-[59.4rem]'>
        <h1 className='mb-4 text-center font-heading font-bold ~text-3xl/[2.625rem]'>
          Orenda Intake Form
        </h1>
        <p className='text-center font-semibold ~text-sm/base'>
          Please fill this out with current information towards your appointment
        </p>

        <section className='mt-10 ~text-sm/base'>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className='~space-y-8/12'>
                <PatientsDetails />
                <InsuranceAndPayment />
              </div>

              <div className='ml-[67px] text-center ~mt-6/8 ~px-2/12'>
                <div className='flex items-center gap-4 ~text-sm/base'>
                  <input
                    className='~size-4/5'
                    id='terms_and_conditions'
                    type='checkbox'
                    value='agreed-to-terms'
                    {...register('terms_and_conditions', {
                      required: 'This field is required',
                    })}
                  />
                  <label htmlFor='terms_and_conditions'>
                    I confirm that I have read and agreed to Orenda's{' '}
                    <Link
                      className='font-medium underline-offset-2 hover:underline'
                      to='/policy'
                    >
                      Terms of Use, and Practice Policy
                    </Link>
                    .&nbsp;
                    <span className='text-red-500'>*</span>
                  </label>
                </div>
              </div>

              <button
                disabled={!acceptedTerms}
                className='mx-auto block w-full max-w-80 rounded-full border border-black px-4 py-2 transition-colors duration-300 ~text-sm/base ~mt-10/12 hover:bg-[#666] hover:text-white disabled:pointer-events-none disabled:touch-none disabled:border-gray-400 disabled:text-gray-500'
              >
                Submit Form
              </button>
            </form>
          </FormProvider>
        </section>
      </div>
    </main>
  );
};

export default Home;
