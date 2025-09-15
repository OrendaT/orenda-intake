import { create } from 'zustand';

const initialState = {
  base64: '',
  text: '',
};

export type SignatureState = typeof initialState;

export type useSignatureProps = {
  signature: typeof initialState;
  setSignature: (payload: SignatureState) => void;
  resetSignature: () => void;
};

const useSignature = create<useSignatureProps>((set) => ({
  signature: initialState,

  setSignature: (payload) =>
    set(() => ({
      signature: payload,
    })),

  resetSignature: () =>
    set(() => ({
      signature: initialState,
    })),
}));

export { useSignature };
