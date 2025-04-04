import { Controller } from 'react-hook-form';
import ReactDatePicker from 'react-date-picker';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import '@/styles/react-date-picker.css';
import 'react-calendar/dist/Calendar.css';

const DatePicker = ({
  name,
  disabled,
  required = true,
  errorMsg = 'This field is required',
  validations,
  ...inputProps
}) => {
  return (
    <Controller
      name={name}
      rules={{
        disabled: disabled,
        required: {
          value: required,
          message: errorMsg,
        },
        validate: validations,
      }}
      render={({ field, fieldState: { error } }) => (
        <div>
          <ReactDatePicker
            value={field.value} 
            onChange={field.onChange}
            required={required}
            calendarIcon={<Calendar className='size-5' />}
            {...inputProps}
            className={cn('w-full border-b-2 font-dm-sans', {
              'border-[#d32f2f] text-[#d32f2f]': error,
            })}
            monthPlaceholder='mm'
            dayPlaceholder='dd'
            yearPlaceholder='yr'
            format='MM/dd/yyyy'
          />

          {error && <p className='error'>{error.message}</p>}
        </div>
      )}
    />
  );
};
export default DatePicker;
