import type { SelectInputProps } from "@/types";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MUISelect,
} from "@mui/material";
import { Controller } from "react-hook-form";

const Select = ({
  label,
  name,
  id,
  options,
  disabled,
  required = true,
  variant = "standard",
  errorMsg = "This field is required",
  placeholder,
  registerOptions,
  validations,
  ...selectProps
}: SelectInputProps) => {
  return (
    <div>
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
        render={({ field, fieldState: { error } }) => (
          <FormControl
            required={required}
            fullWidth
            variant={variant}
            error={!!error}
          >
            <InputLabel id={id || name}>{label}</InputLabel>
            <MUISelect
              {...field}
              value={field.value || ""}
              label={label}
              variant="standard"
              id={id || name}
              fullWidth
              {...selectProps}
            >
              {!required && <MenuItem value="">None</MenuItem>}
              {options?.map(({ label, value }) => (
                <MenuItem key={value} value={value}>
                  {label || value}
                </MenuItem>
              ))}
            </MUISelect>
            {error && <FormHelperText>{errorMsg}</FormHelperText>}
          </FormControl>
        )}
      />
    </div>
  );
};
export default Select;
