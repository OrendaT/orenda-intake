import type { FileInputProps } from '@/types';
import { useFormContext, useFormState, useWatch } from 'react-hook-form';
import { LuUpload } from 'react-icons/lu';
import RequiredMark from './required-mark';
import { cn } from '@/lib/utils';
import { acceptedFormats } from '@/lib/constants';
import ErrorMessage from './error-message';

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

const getMaxSize = (maxSize: number) =>
  `${maxSize < 1 ? maxSize * 1000 : maxSize}${maxSize < 1 ? 'K' : 'M'}B`;

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
  maxLength = 3,
  validations,
  containerClassName,
  ...rest
}: FileInputProps) => {
  const { register } = useFormContext();

  const { errors } = useFormState();
  const files = useWatch({ name, exact: true });

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

        {!!files?.length && (
          <ul className='mb-4 space-y-0.5'>
            {[...files].map((file: File) => (
              <li className='text-orenda-green truncate text-sm font-medium'>
                {file?.name}
              </li>
            ))}
          </ul>
        )}

        <small className='clamp-[text,xs,sm] text-[#626262]'>
          {getFileTypes(accept).join(' or ')} Only • {getMaxSize(maxSize)} max
        </small>

        <ErrorMessage name={name} />

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
                if (!files?.length || !accept) return true;

                const accepted = accept.split(',').map((f) => f.trim());

                for (const file of files) {
                  if (!accepted.includes(file.type)) {
                    return 'Invalid file format';
                  }
                }

                return true;
              },

              maxSize: (files) => {
                if (!files?.length || !maxSize) return true;

                for (const file of files) {
                  if (file.size > maxSize * 1024 * 1024) {
                    return `File size must be less than ${getMaxSize(maxSize)}`;
                  }
                }

                return true;
              },

              maxLength: (files) => {
                if (rest.multiple && files?.length > maxLength) {
                  return `You can upload a maximum of ${maxLength} files`;
                }
                return true;
              },

              ...validations,
            },
          })}
          accept={accept}
          {...rest}
        />
      </label>
    </div>
  );
};
export default FileInput;
