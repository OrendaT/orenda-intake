import Radios from '@/components/ui/radios';
import Address from './address';
import Biography from './biography';
import CAQH from './caqh';
import PersonalInfo from './personal-info';
import LicenseAndDea from './license-and-dea';
import { acceptForCredentialing, YES_NO } from '@/lib/constants';
import FileInput from '@/components/ui/file-input';
import IdentificationRequirements from './identification-requirements';
import StateOfLicense from './state-of-license';
import HearAbout from './hear-about';
import PecosAccount from './pecos-account';
import NPLicenses from './np-licenses';
import DeaReg from './dea-reg';
import AdditionalQualifications from './additional-qualifications';

const Part1 = () => {
  return (
    <div className='form-part'>
      <h2 className='legend clamp-[mb,2,4]'>Part 1: Document Information</h2>
      <p className='mx-auto mb-12 max-w-md text-center'>
        Please provide the necessary documents required for credentialing. This
        will help us verify your qualifications and complete your onboarding.
      </p>

      <PersonalInfo />
      <Address />
      <CAQH />
      <Biography />
      <HearAbout />
      <StateOfLicense />
      <PecosAccount />
      <LicenseAndDea />
      <NPLicenses />
      <DeaReg />

      <fieldset className='fieldset'>
        <FileInput
          heading='Copy of PMHNP-BC (Cert with GOLD seal, or ANCC card is satisfactory)'
          name='pmhnp_bc'
          accept={acceptForCredentialing}
        />
      </fieldset>

      <AdditionalQualifications />

      <fieldset className='fieldset'>
        <FileInput
          heading='Copy of Malpractice Insurance - MUST be CURRENT DATE, not future dated. If expiring soon, please email future dated to credentialing@orendapsych.com'
          name='malpractice_insurance'
          accept={acceptForCredentialing}
        />
      </fieldset>

      <fieldset className='fieldset'>
        <FileInput
          heading='PDF of Resume/CV (please include mm/yyyy of start and end dates for BSN and MSN or DNP)'
          name='resume'
          accept={acceptForCredentialing}
        />
      </fieldset>

      <fieldset className='fieldset'>
        <Radios
          label='Do you have a MSN, a DNP, or both?'
          name='msn_dnp'
          options={[...YES_NO, { value: 'Both' }]}
        />
      </fieldset>

      <IdentificationRequirements />
    </div>
  );
};
export default Part1;
