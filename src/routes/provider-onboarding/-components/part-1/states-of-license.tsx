import Checkboxes from '@/components/ui/checkboxes';
import FileInput from '@/components/ui/file-input';
import Input from '@/components/ui/input';
import Radios from '@/components/ui/radios';
import { YES_NO } from '@/lib/constants';
import type { OnboardingFormData as FormData } from '@/types';
import { useFormContext } from 'react-hook-form';
import StatesOfLicenseSummary from './states-of-license-summary';
import IMask from '@/components/ui/imask';
import { statesOfLicenseOptions, states } from './data';

const collaboratingPhysicianOptions = (fileName: string) => [
  {
    value:
      'I have met the required amount of time and I can practice independently.',
  },
  {
    value: `Yes – I do have a ${fileName} on file with the state, and can provide a copy of my ${fileName} form.`,
  },
  {
    value: `Yes – I do have a ${fileName} on file with the state, but I do not have a copy of the ${fileName} form available.`,
  },
  {
    value: `No, I do not practice independently; I need a collaborating physician agreement, and I do not have a ${fileName} form or any collaborating agreement on file for the state.`,
  },
];

const CPHS = ({
  abbr,
  fileName,
}: {
  abbr: (typeof states)[Exclude<keyof typeof states, 'Others'>]['abbr'];
  fileName: string;
}) => (
  <div className='!space-y-4'>
    <Input
      label={`${abbr} Collaborating Physician Name`}
      name={`states_of_license__${abbr}__collaborating_physician_name`}
      size='small'
    />
    <Input
      label={`${abbr} Collaborating Physician NPI: (put n/a if you do not know)`}
      name={`states_of_license__${abbr}__collaborating_physician_npi`}
      slotProps={{
        htmlInput: {
          maxLength: 10,
        },
      }}
      size='small'
    />
    <Input
      label={`${abbr} Collaborating Physician email address`}
      name={`states_of_license__${abbr}__collaborating_physician_email`}
      type='email'
      size='small'
      helperText='For payor verification purposes only; no other actions will be taken with this information'
    />

    <IMask
      label={`${abbr} Collaborating Physician Phone Number`}
      name={`states_of_license__${abbr}__collaborating_physician_phone`}
      mask='(999) 999-9999'
      type='tel'
      inputProps={{
        size: 'small',
        className: '!-mt-2',
      }}
    />
    <FileInput
      heading={`Please upload your ${fileName} here`}
      name={`states_of_license__${abbr}__${abbr === 'NY' ? 'form_4NP' : 'collaborating_agreement'}_doc`}
      maxSize={0.3}
    />
  </div>
);

const StatesOfLicense = () => {
  const { setValue } = useFormContext<FormData>();

  const HiddenSection = ({ val }: { val: keyof typeof states }) => {
    const { name, abbr } = states[val];

    const fileName = abbr === 'NY' ? '4NP' : ' collaborative agreement';
    const options = collaboratingPhysicianOptions(fileName);

    return (
      <>
        <h3 className='relative mx-auto mt-4 mb-6 flex h-px w-full items-center bg-[#B2B2B2]'>
          <span className='absolute right-1/2 translate-x-1/2 bg-white px-4 text-center font-medium'>
            For {name}
          </span>
        </h3>

        <p className='clamp-[text,xs,sm] mb-2 font-bold'>
          If you are a {abbr} provider and are not yet practicing independently,
          please let us know your current status regarding collaborating
          physician agreements for the State of {name}
          .*
        </p>

        <Radios
          className='sm:grid-cols-1'
          name={`states_of_license__${abbr}__collaborating_physician`}
          options={options}
          showHiddenSectionValue={1}
          hiddenSection={<CPHS abbr={abbr} fileName={fileName} />}
        />

        <FileInput
          heading={`Please upload a copy of your ${abbr} State License`}
          name={`states_of_license__${abbr}__state_license_doc`}
          maxSize={0.3}
          containerClassName='my-4'
        />

        <Radios
          label={`Please do you have a DEA in ${abbr}?`}
          name={`states_of_license__${abbr}__has_DEA`}
          options={YES_NO}
          showHiddenSectionValue={0}
          registerOptions={{
            shouldUnregister: true,
          }}
          onClick={(event) => {
            const target = event.target as HTMLInputElement;
            const option = target.dataset.option;

            const fieldName =
              `states_of_license_summary__${abbr}__DEA` as keyof FormData;

            if (option === 'Yes') {
              setValue(fieldName, 'Complete');
            } else {
              setValue(fieldName, '');
            }
          }}
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
                maxSize={0.3}
              />
            </div>
          }
        />
      </>
    );
  };

  const options = statesOfLicenseOptions.map(({ value }) => ({
    value,
    hiddenSection: <HiddenSection val={value} />,
  }));

  return (
    <fieldset className='fieldset'>
      <Checkboxes
        label={
          <>
            Which of these states do you have a license in?{' '}
            <small>(Select all states licensed)</small>
          </>
        }
        name='states_of_license'
        className='sm:grid-cols-1'
        options={options}
        onClick={(event) => {
          const target = event.target as HTMLInputElement;
          const abbr = target.dataset.option?.split('(')[1].slice(0, 2);
          const licenseSummaryField =
            `states_of_license_summary__${abbr}__license` as keyof FormData;
          const deaSummaryField =
            `states_of_license_summary__${abbr}__DEA` as keyof FormData;

          if (target.checked) {
            setValue(licenseSummaryField, 'Complete');
          } else {
            setValue(licenseSummaryField, '');
            setValue(deaSummaryField, '');
          }
        }}
      />

      <StatesOfLicenseSummary />
    </fieldset>
  );
};
export default StatesOfLicense;
