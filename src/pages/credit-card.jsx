import IMask from '@/components/ui/imask';
import Input from '@/components/ui/input';
import Select from '@/components/ui/select';
import { usStates } from '@/lib/definitions';
import { FormProvider, useForm } from 'react-hook-form';

const CreditCardForm = () => {
  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <>
      <main className='padding-inline bg-dotted-purple py-16 ~text-sm/base'>
        <div className='mx-auto max-w-[59.4rem]'>
          <h1 className='mb-4 text-center font-heading font-bold ~text-3xl/[2.625rem]'>
            Orenda Credit Card Authorization Form
          </h1>
          <p className='mx-auto max-w-3xl text-center font-semibold'>
            Please complete this form so your appointment may be scheduled
            <br />
            <em>
              (Your appointment will be confirmed following the completion of
              this form)
            </em>
          </p>
          <br />
          <p className='mx-auto max-w-3xl text-center'>
            <em>
              If you or someone you know is struggling or in crisis, call the
              National Suicide Prevention Hotline at{' '}
              <a href='tel:18002738255'>1-800-273-8255</a> or{' '}
              <a href='tel:911'>911</a>. Immediate help is available.
            </em>
          </p>

          <section className='mt-10 ~text-sm/base'>
            <FormProvider {...methods}>
              <form onSubmit={onSubmit} noValidate>
                <div className='space-y-8'>
                  {/* Personal Info */}
                  <fieldset className='fieldset'>
                    <section className='fieldset-section'>
                      <Input label='Patient Name' name='name' />

                      <DatePicker
                        label='Date of Birth'
                        name='date_of_birth'
                        containerClasses='pt-4'
                      />

                      <Input label='Cardholder Name' name='cardholder_name' />
                    </section>
                  </fieldset>

                  {/* Address */}
                  <fieldset className='fieldset'>
                    <h2 className='legend'>Address</h2>
                    <section className='fieldset-section'>
                      <div className='!mt-2 grid ~gap-2/3'>
                        <Input label='Street Address' name='address_one' />
                        <Input
                          label='Address - Line 2'
                          name='address_two'
                          placeholder='Apartment, suite, unit, building, floor, etc (optional)'
                          required={false}
                        />
                        <div className='grid gap-y-5 ~gap-x-8/16 sm:grid-cols-3'>
                          <Input
                            label='City'
                            name='city'
                            errorMsg='City is required'
                            size='small'
                          />
                          <Select
                            label='State'
                            name='state'
                            options={usStates}
                            size='small'
                          />
                          <IMask
                            label='Zip Code'
                            name='zip_code'
                            errorMsg='State is required'
                            size='small'
                            mask={'99999'}
                            maskChar=''
                          />
                        </div>
                      </div>
                    </section>
                  </fieldset>
                </div>
              </form>
            </FormProvider>
          </section>
        </div>
      </main>
    </>
  );
};

export default CreditCardForm;
