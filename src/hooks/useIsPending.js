// import axios from '@/lib/axios';
// import { getItem, isValidEmail, setItem } from '@/lib/utils';
// import { useEffect } from 'react';

// const useIsPending = ({ first_name, last_name, email, phone }) => {
//   useEffect(() => {
//     const check = async () => {
//       const form_id = getItem('form_id');

//       const isPending =
//         first_name.length > 1 &&
//         last_name.length > 1 &&
//         isValidEmail(email) &&
//         phone.length > 7;

//       if (isPending && !form_id) {
//         const res = await axios.post('patients', {
//           first_name,
//           last_name,
//           email,
//         });

//         if (res.status === 200) {
//           setItem('form_id', res.data.id);
//         }
//       }
//     };

//     check();
//   }, [first_name, last_name, email, phone]);

//   return;
// };
// export default useIsPending;
