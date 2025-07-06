import type { RadioProps } from "@/types";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";

const RadioBoxes = ({
  name,
  options,
  className,
  disabled,
  required = true,
  errorMsg,
  validations,
  registerOptions,
}: RadioProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {options.map(({ label, value }) => {
        return (
          <label
            className={clsx(
              "block h-full whitespace-pre-line cursor-pointer content-center rounded border border-gray-500 text-center text-sm font-semibold clamp-[px,2,4] clamp-[py,2,4] has-[:checked]:bg-violet-200 has-[:checked]:ring-1 has-[:checked]:ring-purple-300",
              className
            )}
          >
            {label || value}

            {/* Hidden radio input */}
            <input
              className="peer"
              hidden
              type="radio"
              value={value}
              {...register(name, {
                disabled: disabled,
                required: {
                  value: required,
                  message: errorMsg || "This field is required",
                },
                validate: validations,
                ...registerOptions,
              })}
            />
          </label>
        );
      })}
      {errors?.[name]?.message && (
        <p className="px-3 error">{errors?.[name]?.message.toString()}</p>
      )}
    </>
  );
};
export default RadioBoxes;
