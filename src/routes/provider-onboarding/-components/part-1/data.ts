export const states = {
  'New York (NY)': {
    name: 'New York',
    abbr: 'NY',
  },
  'Massachusetts (MA)': {
    name: 'Massachusetts',
    abbr: 'MA',
  },
  'Connecticut (CT)': {
    name: 'Connecticut',
    abbr: 'CT',
  },
  'New Jersey (NJ)': {
    name: 'New Jersey',
    abbr: 'NJ',
  },
} as const;

export const programs = [
  { label: '', value: `Bachelor's (BSN)`, abbr: 'BSN' },
  { label: '', value: `Master's (MSN)`, abbr: 'MSN' },
  { label: '', value: `Doctorate (DNP)`, abbr: 'DNP' },
  { label: 'N/A', value: '', abbr: '' },
] as const;

export const statesOfLicenseOptions = Object.keys(states).map((state) => ({
  value: state as keyof typeof states,
}));

export const cPOptions = (fileName: string) => [
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
