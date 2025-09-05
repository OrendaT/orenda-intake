import HiddenSection from '@/components/hidden-section';
import Checkboxes from '@/components/ui/checkboxes';
import FileInput from '@/components/ui/file-input';
import Input from '@/components/ui/input';
import Radios from '@/components/ui/radios';
import { acceptForCredentialing, YES_NO } from '@/lib/constants';
import type { ProviderOnboardingFormData as FormData } from '@/types';
import { useFormContext } from 'react-hook-form';
import StatesOfLicenseSummary from './states-of-license-summary';
import { StatesContext } from './states-of-license-summary/states-context';
import { LDStates } from '@/lib/definitions';
import { useState } from 'react';
import IMask from '@/components/ui/imask';
import { statesOfLicenseOptions, states } from './data';

const collaboratingPhysicianOptions = [
  {
    value:
      'I have met the required amount of time and I can practice independently.',
  },
  {
    value:
      'Yes – I do have a 4NP on file with the state, and can provide a copy of my 4NP form.',
  },
  {
    value:
      'Yes – I do have a 4NP on file with the state, but I do not have a copy of the 4NP form available.',
  },
  {
    value:
      'No, I do not practice independently; I need a collaborating physician agreement, and I do not have a 4NP form or any collaborating agreement on file for the state.',
  },
];

const CPHS = ({
  abbr,
}: {
  abbr: (typeof states)[Exclude<keyof typeof states, 'Others'>]['abbr'];
}) => (
  <div className='!space-y-4'>
    <Input
      label={`${abbr} Collaborating Physician Name`}
      name={`states_of_license__${abbr}__collaborating_physician_name`}
    />
    <IMask
      label={`${abbr} Collaborating Physician NPI: (put n/a if you do not know)`}
      name={`states_of_license__${abbr}__collaborating_physician_npi`}
      mask={'9999999999'}
      maskChar=''
    />
    <Input
      label={`${abbr} Collaborating Physician email address: (For payor verification purposes only; no other actions will be taken with this information)`}
      name={`states_of_license__${abbr}__collaborating_physician_email`}
      title={`${abbr} Collaborating Physician email address: (For payor verification purposes only; no other actions will be taken with this information)`}
      type='email'
    />

    <IMask
      label={`${abbr} Collaborating Physician Phone Number`}
      name={`states_of_license__${abbr}__collaborating_physician_phone`}
      mask='(999) 999-9999'
      title={`${abbr} Collaborating Physician Phone Number`}
      type='tel'
    />
    <FileInput
      heading='Please upload your 4NP here'
      name={`states_of_license__${abbr}__form_4NP_doc`}
      accept={acceptForCredentialing}
    />
  </div>
);

const StatesOfLicense = () => {
  const [_states, setStates] = useState(() => LDStates);

  const { watch, setValue } = useFormContext<FormData>();

  const values = watch('states_of_license') as (keyof typeof states)[];

  return (
    <StatesContext value={{ states: _states, setStates }}>
      <fieldset className='fieldset'>
        <Checkboxes
          label={
            <>
              Which of these states do you have a license in?{' '}
              <small>(Select all states licensed)</small>
            </>
          }
          name='states_of_license'
          options={statesOfLicenseOptions}
          onClick={(event) => {
            const target = event.target as HTMLInputElement;
            const abbr = target.dataset.option?.split('(')[1].slice(0, 2);
            const fieldName =
              `states_of_license_summary__${abbr}__license` as keyof FormData;

            if (target.checked) {
              setValue(fieldName, 'License Complete');
            } else {
              setValue(fieldName, undefined);
            }
          }}
        />

        {values?.map((val) => {
          const { name, abbr } = states[val];

          return (
            <HiddenSection
              className='m-0 ps-0 pt-1 before:content-none'
              show={!!val}
              key={name}
            >
              <h3 className='relative mx-auto mt-4 mb-6 flex h-px w-full items-center bg-[#B2B2B2]'>
                <span className='absolute right-1/2 translate-x-1/2 bg-white px-4 font-medium'>
                  For {name}
                </span>
              </h3>

              <p className='clamp-[text,xs,sm] mb-2 font-bold'>
                If you are a {abbr} provider and are not yet practicing
                independently, please let us know your current status regarding
                collaborating physician agreements for the State of {name}
                .*
              </p>

              <Radios
                className='sm:grid-cols-1'
                name={`states_of_license__${abbr}__collaborating_physician`}
                options={collaboratingPhysicianOptions}
                showHiddenSectionValue={1}
                hiddenSection={<CPHS abbr={abbr} />}
              />

              <FileInput
                heading={`Please upload a copy of your ${abbr} State License`}
                name={`states_of_license__${abbr}__state_license_doc`}
                accept={acceptForCredentialing}
                containerClassName='my-4'
              />

              <Radios
                label={`Please do you have a DEA in ${abbr}?`}
                name='states_of_license__DE__DEA_state_doc'
                options={YES_NO}
                showHiddenSectionValue={0}
                hiddenSection={
                  <div className='!space-y-4'>
                    <Input
                      label={`${abbr} State DEA Number`}
                      name={`states_of_license__${abbr}__DEA_state_number`}
                      containerClassName='mb-4'
                      slotProps={{
                        htmlInput: {
                          maxLength: 9,
                        },
                      }}
                    />
                    <FileInput
                      heading={`Please upload a copy of your ${abbr} State DEA`}
                      name={`states_of_license__${abbr}__DEA_state_doc`}
                      accept={acceptForCredentialing}
                    />
                  </div>
                }
              />
            </HiddenSection>
          );
        })}

        <StatesOfLicenseSummary />
      </fieldset>
    </StatesContext>
  );
};
export default StatesOfLicense;
