import { Controller } from 'react-hook-form';
import ReactDatePicker from 'react-date-picker';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import '@/styles/react-date-picker.css';
import 'react-calendar/dist/Calendar.css';
import RequiredMark from './required-mark';

const DatePicker = ({
  label,
  name,
  containerClasses,
  disabled,
  required = true,
  errorMsg = 'This field is required',
  validations,
  ...inputProps
}) => {
  return (
    <div className={cn(containerClasses)}>
      {label && (
        <h4 className='label'>
          {label}
          {required && <RequiredMark />}
        </h4>
      )}
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
              yearPlaceholder='yyyy'
              format='MM/dd/yyyy'
            />

            {error && <p className='error'>{error?.message}</p>}
          </div>
        )}
      />
    </div>
  );
};
export default DatePicker;
