import { LDStates } from '@/lib/definitions';
import type { LicenseDea } from '@/types';
import { createContext, useContext } from 'react';

interface IStatesContext {
  states: LicenseDea[];
  setStates: React.Dispatch<React.SetStateAction<LicenseDea[]>>;
}

export const StatesContext = createContext<IStatesContext>({
  states: LDStates,
  setStates: () => {},
});

export const useStates = () => {
  const context = useContext(StatesContext);
  if (!context) {
    throw new Error(
      'useStates must be used within the license and dea fieldset',
    );
  }
  return context;
};
