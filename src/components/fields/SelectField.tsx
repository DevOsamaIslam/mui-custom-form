import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  FormHelperText,
} from "@mui/material"
import React from "react"
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"
import { ICustomField, ISelectField } from "../../types"

interface SelectFieldProps<T extends FieldValues> {
  field: ISelectField<Path<T>>
  formControl: UseFormReturn<T>
}

export const SelectField = <T extends FieldValues>({
  field,
  formControl,
}: SelectFieldProps<T>) => {
  const { control } = formControl

  return (
    <Controller
      name={field.name as Path<T>}
      control={control}
      rules={{ required: field.required }}
      render={({ field: controlField, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel required={field.required}>{field.label}</InputLabel>
          <MuiSelect
            label={field.label}
            {...controlField}
            value={
              controlField.value || (field.type === "multi-select" ? [] : "")
            }
            {...field.otherProps}
            multiple={field.type === "multi-select"}>
            {field.list?.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </MuiSelect>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}
