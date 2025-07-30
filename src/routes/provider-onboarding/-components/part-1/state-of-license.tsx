import HiddenSection from '@/components/hidden-section';
import FileInput from '@/components/ui/file-input';
import Input from '@/components/ui/input';
import Radios from '@/components/ui/radios';
import type { ProviderOnboardingFormData } from '@/types';
import { useFormContext } from 'react-hook-form';

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
  Others: {
    name: 'Others',
    abbr: 'Others',
  },
};

const stateOfLicenseOptions = Object.keys(states).map((state) => ({
  value: state,
}));

const statusOptions = [
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
      name={`${abbr.toLowerCase()}_collab_name`}
    />
    <Input
      label={`${abbr} Collaborating Physician NPI: (put n/a if you do not know)`}
      name={`${abbr.toLowerCase()}_collab_npi`}
    />
    <Input
      label={`${abbr} Collaborating Physician email address: (For payor verification purposes only; no other actions will be taken with this information)`}
      name={`${abbr.toLowerCase()}_collab_address`}
      title={`${abbr} Collaborating Physician email address: (For payor verification purposes only; no other actions will be taken with this information)`}
    />
  </div>
);

const StateOfLicense = () => {
  const { watch } = useFormContext<ProviderOnboardingFormData>();

  const value = watch('state_of_license') as keyof typeof states;
  const statusValue = watch('state_of_license_st');

  return (
    <fieldset className='fieldset'>
      <Radios
        label='Primary state of License'
        name='state_of_license'
        options={stateOfLicenseOptions}
        showHiddenSectionValue='Others'
        hiddenSection={
          <Input label='Please specify' name='state_of_license_other' />
        }
      />

      {Boolean(value) && (
        <HiddenSection
          className='m-0 ps-0 pt-1 before:content-none'
          show={value && value !== 'Others'}
        >
          <h3 className='relative mx-auto mt-4 mb-6 flex h-px w-full items-center bg-[#B2B2B2]'>
            <span className='absolute right-1/2 translate-x-1/2 bg-white px-4 font-medium'>
              For {states[value].name}
            </span>
          </h3>

          <p className='clamp-[text,xs,sm] mb-2 font-bold'>
            If you are a {states[value].abbr} provider and are not yet
            practicing independently, please let us know your current status
            regarding collaborating physician agreements for the State of{' '}
            {states[value].name}.*
          </p>

          <Radios
            className='sm:grid-cols-1'
            name='state_of_license_st'
            options={statusOptions}
            showHiddenSectionValue={[0, 1]}
            hiddenSection={
              statusValue === statusOptions[0].value ? (
                <Option1 abbr={states[value].abbr} />
              ) : statusValue === statusOptions[1].value ? (
                <FileInput
                  heading='Please upload your 4NP here'
                  name='4NP file'
                />
              ) : null
            }
          />
        </HiddenSection>
      )}
    </fieldset>
  );
};
export default StateOfLicense;
