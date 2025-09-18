import type { StateCode } from './forms';

export * from './forms';
export * from './inputs';

export type SVGProps = React.SVGProps<SVGSVGElement>;

type Status = 'complete' | 'in_process';

export type LicenseDea = {
  name: StateCode;
  license?: Record<Status, boolean>;
  dea?: Record<Status, boolean>;
  practice_independently?: Record<'yes' | 'no', boolean>;
};
