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
  { value: `Bachelor's (BSN)`, abbr: 'BSN' },
  { value: `Master's (MSN)`, abbr: 'MSN' },
  { value: `Doctorate (DNP)`, abbr: 'DNP' },
  { value: `N/A`, abbr: '' },
] as const;

export const statesOfLicenseOptions = Object.keys(states).map((state) => ({
  value: state as keyof typeof states,
}));
