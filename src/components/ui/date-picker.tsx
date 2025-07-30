import { Controller } from 'react-hook-form';
import ReactDatePicker from 'react-date-picker';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import '@/styles/react-date-picker.css';
import 'react-calendar/dist/Calendar.css';
import RequiredMark from './required-mark';
import type { TDatePickerProps } from '@/types';

const DatePicker = ({
  label,
  name,
  containerClassName,
  disabled,
  required = true,
  errorMsg = 'This field is required',
  validations,
  ...inputProps
}: TDatePickerProps) => {
  return (
    <div className={cn('mt-2', containerClassName)}>
      {label && (
        <h4 className='label'>
          {label}
          {required && <RequiredMark />}
        </h4>
      )}
      <Controller
        name={name}
        disabled={disabled}
        rules={{
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
              calendarIcon={<Calendar className='clamp-[size,4,1.2rem]' />}
              {...inputProps}
              className={cn('font-dm-sans w-full border-b-2', {
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
