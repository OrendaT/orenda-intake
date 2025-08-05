import { createContext, useState } from 'react';

const initialValue = {
  base64: '',
  text: '',
};

export type TSignature = typeof initialValue;

type ContextType = {
  signature: typeof initialValue;
  setSignature: React.Dispatch<React.SetStateAction<TSignature>>;
  resetSignature: () => void;
};

export const SignatureContext = createContext<ContextType>({
  signature: initialValue,
  setSignature: () => {},
  resetSignature: () => {},
});

export const SignatureProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [signature, setSignature] = useState(initialValue);

  return (
    <SignatureContext.Provider
      value={{
        signature,
        setSignature,
        resetSignature: () => setSignature(initialValue),
      }}
    >
      {children}
    </SignatureContext.Provider>
  );
};
