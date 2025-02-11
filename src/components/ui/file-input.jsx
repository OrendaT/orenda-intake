import { useFormContext } from 'react-hook-form';
import { LuUpload } from 'react-icons/lu';

const FileInput = ({
  label,
  name,
  disabled,
  required,
  errorMsg,
  validations,
}) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const file = watch(name)?.[0];

  return (
    <div className='grid gap-[0.81rem] rounded-md border border-dashed border-[#D1D1D1] px-5 text-center text-[#333] ~pt-7/[2.31rem] ~pb-8/10'>
      <label
        htmlFor={name}
        className='mx-auto block w-fit rounded-full bg-[#EAEAEA] p-2'
      >
        <LuUpload className='~size-4/5' />
      </label>

      <p>Upload The {label} of your Insurance card</p>

      {file && (
        <p className='truncate text-sm font-medium text-orenda-green'>
          {file?.name}
        </p>
      )}

      <small className='text-[#626262] ~text-xs/sm'>
        doc, .docx, .pdf, .pptx, .jpg, .jpeg, .png, .xlsx, .txt and .gif • 20MB
        max
      </small>

      {errors?.[name]?.message && (
        <p className='mt-2 text-sm text-red-500'>{errors?.[name].message}</p>
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
          validate: validations,
        })}
      />
    </div>
  );
};
export default FileInput;
