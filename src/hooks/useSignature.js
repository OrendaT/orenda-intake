import { SignatureContext } from '@/context/signature-context';
import { useContext } from 'react';

const useSignature = () => {
  const context = useContext(SignatureContext);

  if (!context)
    throw new Error(
      'Signature context must be used inside a signature context provider',
    );

  return context;
};

export default useSignature;
