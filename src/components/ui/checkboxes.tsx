import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import RequiredMark from "./required-mark";
import type { CheckboxProps } from "@/types";
import Input from "./input";

const Checkboxes = ({
  label,
  name,
  options,
  size,
  className,
  disabled,
  required = true,
  errorMsg,
  registerOptions,
  validations,
  otherLabel,
  otherName,
}: CheckboxProps) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const selected = watch(name);
  const includesOther = Array.isArray(selected) && selected.includes("Other");

  return (
    <div>
      <h3 className="label">
        {label}
        {required && <RequiredMark />}
      </h3>
      <div className={cn("grid gap-x-3 sm:grid-cols-2", className)}>
        {options.map(({ label, value }) => {
          const option = label || value;
          const id = name + value;

          return (
            <div key={id} className={cn("flex items-baseline gap-2")}>
              <input
                id={id}
                className={cn("peer flex-shrink-0", size)}
                type="checkbox"
                value={option}
                {...register(name, {
                  disabled: disabled,
                  required: {
                    value: required,
                    message: errorMsg || "This field is required",
                  },
                  ...registerOptions,
                  validate: validations,
                })}
              />
              <label htmlFor={id}>{option}</label>
            </div>
          );
        })}
      </div>

      {errors?.[name]?.message && (
        <p className="error px-3">{errors?.[name]?.message.toString()}</p>
      )}

      {includesOther && (
        <Input
          label={otherLabel || "Other? Please specify"}
          name={otherName || name + "_other"}
          required={includesOther}
        />
      )}
    </div>
  );
};
export default Checkboxes;
