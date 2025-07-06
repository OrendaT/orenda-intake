import { createContext, useState } from "react";

const initialValue = {
  base64: "",
  text: "",
};

export type TSignature = typeof initialValue;

export const SignatureContext = createContext<{
  signature: typeof initialValue;
  setSignature: React.Dispatch<React.SetStateAction<TSignature>>;
}>({ signature: initialValue, setSignature: () => {} });

const SignatureProvider = ({ children }: { children: React.ReactNode }) => {
  const [signature, setSignature] = useState(initialValue);

  return (
    <SignatureContext.Provider value={{ signature, setSignature }}>
      {children}
    </SignatureContext.Provider>
  );
};

export default SignatureProvider;
