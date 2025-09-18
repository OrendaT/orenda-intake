import FileInput from '@/components/ui/file-input';

const IdentificationRequirements = () => {
  return (
    <fieldset className='fieldset'>
      <h3 className='heading'>Identification Requirements</h3>
      <p className='mb-8 text-center text-sm font-medium'>
        To comply with federal and state regulations, we require two forms of
        identification from each provider during onboarding. This helps verify
        your identity and establish your eligibility for practice within our
        network.
      </p>

      <FileInput
        heading='1. Photo ID'
        subheading={
          <>
            Please upload a primary form of photo identification that meets the
            following criteria (choose one):
            <ul className='list-disc ps-5'>
              <li>
                U.S. Government ID (e.g., state-issued driver’s license,
                non-driver’s identification card, Uniformed Service ID card,
                U.S. permanent resident card, or an identification card
              </li>
            </ul>
          </>
        }
        name='photo_ID'
      />
      <FileInput
        heading='Upload Your Proof of Address ID'
        name='proof_of_address_ID'
      />
    </fieldset>
  );
};
export default IdentificationRequirements;
