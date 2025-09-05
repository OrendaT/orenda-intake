import type { FileInputProps } from '@/types';
import { useFormContext } from 'react-hook-form';
import { LuUpload } from 'react-icons/lu';
import RequiredMark from './required-mark';
import { cn } from '@/lib/utils';
import { acceptedFormats } from '@/lib/constants';

const getFileTypes = (accept: string) => {
  const types = accept.split(',');
  const fileTypes: string[] = [];

  types.forEach((type) => {
    if (type.includes('image/')) {
      fileTypes.push('Image');
    } else if (type.includes('application/pdf')) {
      fileTypes.push('Pdf');
    } else if (type.includes('word')) {
      fileTypes.push('.docx');
    } else if (type.includes('docx')) {
      fileTypes.push('.docx');
    }
  });

  return [...new Set(fileTypes)];
};

const FileInput = ({
  label,
  heading,
  subheading,
  name,
  disabled,
  required = true,
  errorMsg,
  accept = acceptedFormats.join(','),
  maxSize = 5,
  validations,
  containerClassName,
}: FileInputProps) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const file = watch(name)?.[0];

  return (
    <div className={cn('mt-2', containerClassName)}>
      {heading && (
        <h3 className='label'>
          {heading}
          {required && <RequiredMark />}
        </h3>
      )}

      {subheading && (
        <div className='clamp-[text,xs,sm] mb-3 font-medium'>{subheading}</div>
      )}

      <label
        className={cn(
          'clamp-[pt,7,2.31rem] clamp-[pb,8,10] hover:border-orenda-purple/60 block cursor-pointer rounded-md border-2 border-dashed border-[#D1D1D1] px-5 text-center text-[#333] transition-colors duration-300',
          {
            'border-error-red hover:border-error-red': errors?.[name]?.message,
          },
        )}
      >
        <div className='mx-auto mb-4 w-fit rounded-full bg-[#EAEAEA] p-2.5'>
          <LuUpload className='clamp-[size,4,5]' />
        </div>

        {label && <p className='mb-[0.81rem] text-sm'>{label}</p>}

        {file && (
          <p className='text-orenda-green mb-4 truncate text-sm font-medium'>
            {file?.name}
          </p>
        )}

        <small className='clamp-[text,xs,sm] text-[#626262]'>
          {getFileTypes(accept).join(' or ')} Only • {maxSize}MB max
        </small>

        {errors?.[name]?.message && (
          <p className='error'>{errors?.[name]?.message.toString()}</p>
        )}

        {/* Hidden File Input */}
        <input
          hidden
          id={name}
          type='file'
          {...register(name, {
            disabled: disabled,
            required: {
              value: required,
              message: errorMsg || 'This field is required',
            },
            validate: {
              empty: (value) => {
                if (required)
                  return value.length > 0 || 'This field is required';
              },
              acceptedFormats: (files) => {
                const fileType = files[0]?.type;
                if (fileType && accept) {
                  const accepted = accept.split(',');

                  return accepted.includes(fileType) || 'Invalid file format';
                }
              },
              maxSize: (files) => {
                const fileSize = files[0]?.size;
                if (fileSize && maxSize) {
                  return (
                    fileSize <= maxSize * 1024 * 1024 ||
                    `File size must be less than ${maxSize}MB`
                  );
                }
              },
              ...validations,
            },
          })}
          accept={accept}
        />
      </label>
    </div>
  );
};
export default FileInput;
