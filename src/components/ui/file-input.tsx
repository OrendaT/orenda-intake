import type { FileInputProps } from "@/types";
import { useFormContext } from "react-hook-form";
import { LuUpload } from "react-icons/lu";

const imageTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "image/bmp",
  "image/tiff",
  "image/x-icon",
];

const FileInput = ({
  label,
  name,
  disabled,
  required = true,
  errorMsg,
  accept = "image/*,application/pdf",
  maxSize = 5,
  validations,
}: FileInputProps) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const file = watch(name)?.[0];

  return (
    <div className="grid gap-[0.81rem] rounded-md border border-dashed border-[#D1D1D1] px-5 text-center text-[#333] clamp-[pt,7,2.31rem] clamp-[pb,8,10]">
      <label
        htmlFor={name}
        className="mx-auto block w-fit rounded-full bg-[#EAEAEA] p-2"
      >
        <LuUpload className="clamp-[size,5,6]" />
      </label>

      <p className="clamp-[text,sm,base]">{label}</p>

      {file && (
        <p className="truncate text-sm font-medium text-orenda-green">
          {file?.name}
        </p>
      )}

      <small className="text-[#626262] clamp-[text,xs,sm]">
        Image or Pdf Only • {maxSize}MB max
      </small>

      {errors?.[name]?.message && (
        <p className="error">{errors?.[name]?.message.toString()}</p>
      )}

      {/* Hidden File Input */}
      <input
        hidden
        id={name}
        type="file"
        {...register(name, {
          disabled: disabled,
          required: {
            value: required,
            message: errorMsg || "This field is required",
          },
          validate: {
            empty: (value) => {
              if (required) return value.length > 0 || "This field is required";
            },
            acceptedFormats: (files) => {
              const fileType = files[0]?.type;
              if (required && accept) {
                let acceptedFiles = accept.split(",");

                if (acceptedFiles.includes("image/*")) {
                  acceptedFiles = [...acceptedFiles, ...imageTypes];
                }

                return (
                  acceptedFiles.includes(fileType) || "Invalid file format"
                );
              }
            },
            ...validations,
          },
        })}
        accept={accept}
      />
    </div>
  );
};
export default FileInput;
