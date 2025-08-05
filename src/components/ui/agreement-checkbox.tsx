import { useFormContext } from "react-hook-form";
import { cn } from "../../lib/utils";
import type { InputProps } from "@/types";

const AgreementCheckbox = ({
  label,
  name,
  errorMsg,
  className,
  registerOptions,
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <label
        className={cn(
          "flex items-center gap-2 text-sm text-gray-700",
          className
        )}
      >
        <input
          type="checkbox"
          className="size-4"
          value={label?.toString()}
          {...register(name, {
            required: errorMsg,
            ...registerOptions,
          })}
        />
        {label}
      </label>
      {errors?.[name]?.message && (
        <p className="error px-3">{errors?.[name]?.message.toString()}</p>
      )}
    </div>
  );
};
export default AgreementCheckbox;
