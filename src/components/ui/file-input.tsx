import type { FileInputProps } from '@/types';
import { useFormContext } from 'react-hook-form';
import { LuUpload } from 'react-icons/lu';
import RequiredMark from './required-mark';
import { cn } from '@/lib/utils';

const imageTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'image/bmp',
  'image/tiff',
  'image/x-icon',
];

const FileInput = ({
  label,
  heading,
  subheading,
  name,
  disabled,
  required = true,
  errorMsg,
  accept = 'image/*,application/pdf',
  maxSize = 5,
  validations,
  className,
}: FileInputProps) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const file = watch(name)?.[0];

  return (
    <div className={cn('mt-2',className)}>
      {heading && (
        <h3 className='label'>
          {heading}
          {required && <RequiredMark />}
        </h3>
      )}

      {subheading && (
        <p className='clamp-[text,xs,sm] mb-3 font-medium'>{subheading}</p>
      )}

      <div className='clamp-[pt,7,2.31rem] clamp-[pb,8,10] rounded-md border border-dashed border-[#D1D1D1] px-5 text-center text-[#333]'>
        <label
          htmlFor={name}
          className='mx-auto mb-4 block w-fit rounded-full bg-[#EAEAEA] p-2.5'
        >
          <LuUpload className='clamp-[size,4,5]' />
        </label>

        <p className='mb-[0.81rem] text-sm'>{label}</p>

        {file && (
          <p className='text-orenda-green mb-4 truncate text-sm font-medium'>
            {file?.name}
          </p>
        )}

        <small className='clamp-[text,xs,sm] text-[#626262]'>
          {accept.includes('image/') && accept.includes('application/pdf')
            ? 'Image or Pdf'
            : accept.includes('image/')
              ? 'Image'
              : 'Pdf'}{' '}
          Only • {maxSize}MB max
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
                if (required && accept) {
                  let acceptedFiles = accept.split(',');

                  if (acceptedFiles.includes('image/*')) {
                    acceptedFiles = [...acceptedFiles, ...imageTypes];
                  }

                  return (
                    acceptedFiles.includes(fileType) || 'Invalid file format'
                  );
                }
              },
              ...validations,
            },
          })}
          accept={accept}
        />
      </div>
    </div>
  );
};
export default FileInput;
