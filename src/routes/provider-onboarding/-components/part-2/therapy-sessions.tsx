// import HiddenSection from '@/components/hidden-section';
// import Input from '@/components/ui/input';
// import Radios from '@/components/ui/radios';
// import Select from '@/components/ui/select';
// import { YES_NO } from '@/lib/constants';
// import type { ProviderOnboardingFormData } from '@/types';
// import { useFormContext } from 'react-hook-form';

// const therapySessions = [
//   { value: 'Couples therapy' },
//   { value: 'Talk Therapy' },
//   { value: 'Do not currently offer therapy only sessions' },
//   { value: 'Others' },
// ];

// const TherapySessions = () => {
//   const { watch } = useFormContext<ProviderOnboardingFormData>();
//   const hasOthers = watch('therapy_session')?.includes('Others');

//   return (
//     <fieldset className='fieldset'>
//       <Radios
//         label='Do you offer therapy-only sessions?'
//         name='offers_therapy_session'
//         options={YES_NO}
//         showHiddenSectionValue={0}
//         hiddenSection={
//           <div className='space-y-4'>
//             <Select
//               containerClassName='clamp-[max-w,15rem,lg]'
//               label='If yes which of these do you provide'
//               name='therapy_session'
//               options={therapySessions}
//               multiple
//             />
//             <HiddenSection show={hasOthers}>
//               <Input
//                 label='Others? Please specify'
//                 name='therapy_session_other'
//               />
//             </HiddenSection>
//           </div>
//         }
//       />
//     </fieldset>
//   );
// };
// export default TherapySessions;
