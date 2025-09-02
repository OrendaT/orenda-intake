import HiddenSection from '@/components/hidden-section';
import Checkboxes from '@/components/ui/checkboxes';
import FileInput from '@/components/ui/file-input';
import Input from '@/components/ui/input';
import Radios from '@/components/ui/radios';
import { acceptForCredentialing } from '@/lib/constants';
import type { ProviderOnboardingFormData as FormData } from '@/types';
import { useFormContext } from 'react-hook-form';
import StatesOfLicenseSummary from './states-of-license-summary';
import { StatesContext } from './states-of-license-summary/states-context';
import { LDStates } from '@/lib/definitions';
import { useState } from 'react';
import IMask from '@/components/ui/imask';

const states = {
  'New York (NY)': {
    name: 'New York',
    abbr: 'NY',
  },
  'Massachusetts (MA)': {
    name: 'Massachusetts',
    abbr: 'MA',
  },
  'Connecticut (CT)': {
    name: 'Connecticut',
    abbr: 'CT',
  },
  'New Jersey (NJ)': {
    name: 'New Jersey',
    abbr: 'NJ',
  },
};

export const statesOfLicenseOptions = Object.keys(states).map((state) => ({
  value: state,
}));

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

const Option1 = ({
  abbr,
}: {
  abbr: (typeof states)[Exclude<keyof typeof states, 'Others'>]['abbr'];
}) => (
  <div className='space-y-4'>
    <Input
      label={`${abbr} Collaborating Physician Name`}
      name={`${abbr}_collaborating_physician_name`}
    />
    <Input
      label={`${abbr} Collaborating Physician NPI: (put n/a if you do not know)`}
      name={`${abbr}_collaborating_physician_npi`}
    />
    <Input
      label={`${abbr} Collaborating Physician email address: (For payor verification purposes only; no other actions will be taken with this information)`}
      name={`${abbr}_collaborating_physician_email`}
      title={`${abbr} Collaborating Physician email address: (For payor verification purposes only; no other actions will be taken with this information)`}
      type='email'
    />
    <IMask
      label={`${abbr} Collaborating Physician Phone Number`}
      name={`${abbr}_collaborating_physician_phone`}
      mask='(999) 999-9999'
      title={`${abbr} Collaborating Physician Phone Number`}
      type='tel'
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
            const fieldName =
              `${target.dataset.option?.split('(')[1].slice(0, 2)}_license` as keyof FormData;

            if (target.checked) {
              setValue(fieldName, ['license_complete']);
            } else {
              setValue(fieldName, undefined);
            }
          }}
        />

        {values?.map((val) => {
          const state = states[val];
          const collaborating_physician = watch(
            `${state.abbr}_collaborating_physician` as keyof FormData,
          );

          return (
            <HiddenSection
              className='m-0 ps-0 pt-1 before:content-none'
              show={!!val}
              key={state.name}
            >
              <h3 className='relative mx-auto mt-4 mb-6 flex h-px w-full items-center bg-[#B2B2B2]'>
                <span className='absolute right-1/2 translate-x-1/2 bg-white px-4 font-medium'>
                  For {state.name}
                </span>
              </h3>

              <p className='clamp-[text,xs,sm] mb-2 font-bold'>
                If you are a {state.abbr} provider and are not yet practicing
                independently, please let us know your current status regarding
                collaborating physician agreements for the State of {state.name}
                .*
              </p>

              <Radios
                className='sm:grid-cols-1'
                name={`${state.abbr}_collaborating_physician`}
                options={collaboratingPhysicianOptions}
                showHiddenSectionValue={[0, 1]}
                hiddenSection={
                  collaborating_physician ===
                  collaboratingPhysicianOptions[0].value ? (
                    <Option1 abbr={state.abbr} />
                  ) : collaborating_physician ===
                    collaboratingPhysicianOptions[1].value ? (
                    <FileInput
                      heading='Please upload your 4NP here'
                      name={`${state.abbr}_form_4NP_doc`}
                      accept={acceptForCredentialing}
                    />
                  ) : null
                }
              />

              <FileInput
                heading={`Please upload a copy of your ${state.abbr} State License`}
                name={`${state.abbr}_state_license_doc`}
                accept={acceptForCredentialing}
                containerClassName='mt-4 mb-2'
              />
              <Input
                label={`${state.abbr} State DEA Number`}
                name={`${state.abbr}_state_dea_number`}
                containerClassName='mb-4'
              />
              <FileInput
                heading={`Please upload a copy of your ${state.abbr} State DEA`}
                name={`${state.abbr}_state_dea_doc`}
                accept={acceptForCredentialing}
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
