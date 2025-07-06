import { cn } from "@/lib/utils";
import type { SelectInputProps } from "@/types";
import { useFormContext } from "react-hook-form";

const SelectCheckboxes = ({
  options,
  name,
  className,
  required = true,
  disabled,
}: SelectInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {options.map(({ label, value }) => {
        const id = name + value;
        const option = label || value;
        return (
          <label
            key={id}
            className={cn(
              "flex cursor-pointer items-center rounded-lg border border-[#C9C9C9] px-4 clamp-[gap,2,4] clamp-[py,0.9rem,4] hover:border-[#ecf5eb] hover:bg-[#ecf5eb]",
              className
            )}
          >
            <input
              className="rounded-sm border border-[#C9C9C9] clamp-[size,4,5]"
              type="checkbox"
              value={value}
              id={id}
              {...register(name, {
                required: {
                  value: required,
                  message: "Please select at least one",
                },
                disabled: disabled,
              })}
            />
            <span>{option}</span>
          </label>
        );
      })}

      {errors?.[name]?.message && (
        <p className="error mt-0 px-3">{errors?.[name]?.message.toString()}</p>
      )}
    </>
  );
};

export default SelectCheckboxes;
