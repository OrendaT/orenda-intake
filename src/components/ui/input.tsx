import { cn } from "@/lib/utils";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import type { InputProps } from "@/types";
import RequiredMark from "./required-mark";

const Input = ({
  name,
  customLabel,
  type = "text",
  id,
  required = true,
  disabled,
  variant = "standard",
  errorMsg = "This field is required",
  placeholder,
  validations,
  className,
  containerClassName,
  registerOptions,
  ...inputProps
}: InputProps) => {
  return (
    <div className={cn("w-full", containerClassName)}>
      {customLabel && (
        <h3 className="label">
          {customLabel}
          {required && <RequiredMark />}
        </h3>
      )}
      <Controller
        name={name}
        disabled={disabled}
        rules={{
          required: {
            value: required,
            message: errorMsg,
          },
          ...registerOptions,
          validate: validations,
        }}
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <TextField
            {...field}
            inputRef={ref}
            required={required}
            type={type}
            helperText={error ? error.message : null}
            id={id || name}
            error={!!error}
            variant={variant}
            fullWidth
            placeholder={placeholder}
            className={className}
            {...inputProps}
          />
        )}
      />
    </div>
  );
};
export default Input;
