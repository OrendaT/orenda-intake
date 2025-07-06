import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import RequiredMark from "./required-mark";
import type { RadioProps } from "@/types";

const Radios = ({
  name,
  options,
  className,
  disabled,
  label,
  grid = true,
  required = true,
  showRequiredMark = true,
  errorMsg = "This field is required",
  labelSuffix,
  showHiddenSectionValue,
  hiddenSection,
  registerOptions,
  containerClassName,
}: RadioProps) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const selectedValue = watch(name);

  const showHiddenSection =
    typeof showHiddenSectionValue === "number"
      ? selectedValue === options[showHiddenSectionValue]
      : Array.isArray(showHiddenSectionValue)
        ? showHiddenSectionValue.includes(selectedValue)
        : typeof showHiddenSectionValue === "string"
          ? selectedValue === showHiddenSectionValue
          : false;

  return (
    <div className={cn("w-full", containerClassName)}>
      {label && (
        <h3 className="label">
          {label}
          {required && showRequiredMark && <RequiredMark />}
          <div className="inline-flex h-full flex-col items-center">
            {labelSuffix}
          </div>
        </h3>
      )}
      <div
        className={cn(
          grid
            ? "grid gap-x-3 gap-y-1 sm:grid-cols-2"
            : "flex items-center clamp-[gap,5,7]",
          className
        )}
      >
        {options.map(({ label, value }) => {
          const id = name + value;
          const option = label || value;
          return (
            <div
              key={id}
              className={cn(
                "flex items-center gap-2 font-medium clamp-[text,sm,base]"
              )}
            >
              <input
                id={id}
                className="peer size-4 flex-shrink-0"
                type="radio"
                value={option}
                {...register(name, {
                  disabled: disabled,
                  required: {
                    value: required,
                    message: errorMsg,
                  },
                  ...registerOptions,
                })}
              />
              <label htmlFor={name + option}>{option}</label>
            </div>
          );
        })}
      </div>
      {errors?.[name]?.message && (
        <p className="error px-3">{errors?.[name]?.message.toString()}</p>
      )}

      {showHiddenSection && (
        <div className="hidden-section mt-5 bg-transparent">
          {hiddenSection}
        </div>
      )}
    </div>
  );
};
export default Radios;
