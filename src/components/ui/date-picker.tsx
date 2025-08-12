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
        <div className={cn('relative pt-4', containerClassName)}>
          {label && (
            <h4
              className={cn(
                'label absolute top-5 right-0 left-0 z-[1] mb-0 w-fit min-w-28 origin-top-left -translate-y-1 bg-white font-medium transition-all duration-300',
                field.value && '-translate-y-6 scale-75 bg-transparent !pb-0',
                error && '',
              )}
            >
              {label}
              {required && <RequiredMark />}
            </h4>
          )}

          <ReactDatePicker
            value={field.value}
            onChange={field.onChange}
            required={required}
            calendarIcon={<Calendar className='clamp-[size,4,1.2rem]' />}
            {...inputProps}
            className={cn('font-dm-sans w-full border-b-2', {
              'border-[#d32f2f] text-[#d32f2f] [&_svg]:stroke-[#d32f2f]': error,
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
  );
};
export default DatePicker;
