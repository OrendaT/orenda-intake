import {
  FaCcAmex,
  FaCcVisa,
  FaCcDiscover,
  FaCcMastercard,
  FaCcJcb,
  FaCreditCard,
} from 'react-icons/fa6';
import { FaCcAmex as FaCcAmericanExpress } from 'react-icons/fa';

const PaymentIcon = ({ type }) => {
  const Icon = () => {
    switch (type) {
      case 'visa':
        return <FaCcVisa />;
      case 'mastercard':
        return <FaCcMastercard />;
      case 'american-express':
        return <FaCcAmericanExpress />;
      case 'discover':
        return <FaCcDiscover />;
      case 'amex':
        return <FaCcAmex />;
      case 'jcb':
        return <FaCcJcb />;
      default:
        return <FaCreditCard />;
    }
  };

  return (
    <span className='text-black *:size-5'>
      <Icon />
    </span>
  );
};
export default PaymentIcon;
