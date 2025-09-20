import { LDStates } from '@/lib/definitions';
import type { LicenseDea } from '@/types';
import { create } from 'zustand';

export type useStatesProps = {
  states: LicenseDea[];
  addState: (payload: LicenseDea) => void;
  removeState: (payload: LicenseDea['name']) => void;
};

const useStates = create<useStatesProps>((set) => ({
  states: LDStates,

  addState: (payload) =>
    set(({ states }) => {
      const hasState = states.find((s) => s.name === payload.name);

      return {
        states: hasState ? states : [...states, payload],
      };
    }),

  removeState: (payload) =>
    set(({ states }) => {
      const newState = states.filter((s) => s.name !== payload);

      return {
        states: newState,
      };
    }),
}));

export { useStates };
