import React, { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import PatientsDetails from '../components/home/patients-details';
import InsuranceAndPayment from '../components/home/insurance_and_payment';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import html2pdf from 'html2pdf.js';
import FormPdf from './FormPdf.jsx';

const Home = () => {
  const methods = useForm();
  const { handleSubmit, register, watch } = methods;
  const pdfRef = useRef();

  const onSubmit = async (data) => {
    console.log(data);

    // Generate PDF
    const element = pdfRef.current;
    const opt = {
      margin: 1,
      filename: 'orenda_intake_form.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    };

    const pdf = await html2pdf().from(element).set(opt).outputPdf('blob');

    // Prepare form data for EmailJS
    const templateParams = {
      ...data,
      intake: pdf, // Attach the PDF
    };

    try {
      // Send email with PDF attachment
      const response = await emailjs.send(
        'service_xal9mrc', // Replace with your EmailJS service ID
        'template_ehlch6c', // Replace with your EmailJS template ID
        templateParams, // Form data to be sent
        'Wv61Pn9AOeH61J_Jm' // Replace with your EmailJS public key
      );


      console.log('Email sent successfully!', response);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  const acceptedTerms = watch('terms_and_conditions');

  return (
    <div className='padding-inline pb-16 pt-8'>
      <div className='mx-auto max-w-[59.4rem]'>
        <h1 className='text-center font-heading font-bold ~text-3xl/[2.625rem]'>
          Orenda Intake Form
        </h1>
        <p className='text-center font-semibold ~text-sm/base'>
          Please fill this out with current information towards your appointment
        </p>

        <section className='mt-8 ~text-sm/base'>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className='~space-y-8/12'>
                <PatientsDetails />
                <InsuranceAndPayment />
              </div>

              <div className='~mt-6/8 ~px-2/12 text-center ml-[67px]'>
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

        {/* Hidden PDF Content */}
        <div style={{ display: 'none' }}>
          <div ref={pdfRef}>
            <FormPdf formData={methods.getValues()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;