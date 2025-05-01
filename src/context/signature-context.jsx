import { createContext, useState } from 'react';

const initialValue = {
  base64: '',
  text: '',
};

export const SignatureContext = createContext(initialValue);

const SignatureProvider = ({ children }) => {
  const [signature, setSignature] = useState(initialValue);

  return (
    <SignatureContext.Provider value={{ signature, setSignature }}>
      {children}
    </SignatureContext.Provider>
  );
};

export default SignatureProvider;
